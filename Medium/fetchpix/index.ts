import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import client from 'prom-client'
import { timing, type TimingVariables } from 'hono/timing'
import logger from './logger'
import Pool from 'worker-threads-pool'
import NodeCache from 'node-cache'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

/**
 * Type definition for timing variables.
 */
type Variables = TimingVariables;

/**
 * Hono application instance.
 */
export const app = new Hono<{ Variables: Variables }>();
app.use(timing());

/**
 * Cache instance for storing image URLs.
 * The cache has a time-to-live of 30 minutes.
 */
const cache = new NodeCache({ stdTTL: 3600 / 2 }); // Cache for 30 minutes

/**
 * Worker thread pool with a maximum of 4 threads.
 */
const pool = new Pool({ max: 4 }); // Pool with 4 worker threads

/**
 * Swagger definition.
 */
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Fetchpix API Reference',
        version: '1.0.0',
        description: 'A simple and lightweight API to fetch random image URLs based on search queries.',
    },
    servers: [
        {
            url: 'https://fetchpix.one',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['index.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Express app to serve Swagger docs.
 */
export const expressApp = express();
expressApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

/**
 * @openapi
 * /metrics:
 *   get:
 *     description: Retrieve Prometheus metrics
 *     responses:
 *       200:
 *         description: Metrics in text format
 */

/**
 * @openapi
 * /:
 *   get:
 *     description: Fetch a random image URL based on a search query
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Search query for fetching images
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON response containing the image URL and metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 time_taken:
 *                   type: string
 *                 download_url:
 *                   type: string
 *       404:
 *         description: No images found for the given query
 */

/**
 * Endpoint to retrieve Prometheus metrics.
 * @param c - The context object for the request.
 * @returns The metrics in text format.
 */
app.get('/metrics', async (c) => {
    c.header('Content-Type', client.register.contentType);
    return c.text(await client.register.metrics());
});

/**
 * Interface representing the structure of an image response.
 * @property url - The URL of the image.
 * @property time_taken - The time taken to fetch the image.
 * @property download_url - The download URL for the image.
 */
interface ImageResponse {
    url: string;
    time_taken: string;
    download_url: string;
}

/**
 * Fetches image URLs based on a search query.
 * @param query - The search query for fetching images.
 * @returns A promise that resolves to an array of image URLs.
 */
async function fetchImageUrls(query: string): Promise<string[]> {
    const url = `https://pxhere.com/en/photos?q=${encodeURIComponent(query)}&search=&NSFW=off`;
    try {
        const startTime = Date.now();
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const imageUrls = $('img[src^="https://"]')
            .map((_, el) => $(el).attr('src'))
            .get()
            .filter(Boolean) as string[];

        logger.info(`Fetched ${imageUrls.length} images in ${Date.now() - startTime}ms`);

        return imageUrls;
    } catch (error) {
        logger.error('An error occurred:', error);
        return [];
    }
}

/**
 * Generates a download URL for a given image URL.
 * @param randomUrl - The image URL to generate a download link for.
 * @returns The download URL for the image.
 * @throws Will throw an error if the image URL is invalid.
 */
export function getDownloadUrl(randomUrl: string): string {
    const urlParts = randomUrl.split('/');
    const imageId = urlParts[urlParts.length - 1].split('-').pop()?.split('.')[0];
    if (!imageId) {
        throw new Error('Invalid image URL');
    }
    return `https://get.pxhere.com/photo/landscape-nature-snow-cold-winter-animal-cute-country-bear-wildlife-rural-weather-mammal-iceland-arctic-polar-bear-arctic-fox-outdoors-hdr-vertebrate-freezing-samoyed-dog-breed-group-${imageId}.jpg?attachment`;
}

if (isMainThread) {
    /**
     * Main route handler for the application.
     * @param c - The context object for the request.
     * @returns A JSON response containing the image URL and metadata.
     */
    app.get('/', async (c) => {
        const startTime = Date.now();
        const query = c.req.query('q') || 'blue sky';

        const cachedResult = cache.get<string[]>(query);
        if (cachedResult) {
            const randomUrl = cachedResult[Math.floor(Math.random() * cachedResult.length)];
            const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
            const response: ImageResponse = {
                url: randomUrl.replaceAll("!s1", "!d"),
                time_taken: `${timeTaken} seconds`,
                download_url: getDownloadUrl(randomUrl)
            };

            logger.info(`Responded with cached image URL in ${timeTaken} seconds`);
            return c.json(response);
        }

        return new Promise((resolve) => {
            pool.acquire(__filename, { workerData: query }, (err, worker) => {
                if (err) throw err;
                worker.on('message', (imageUrls: string[]) => {
                    if (imageUrls.length === 0) {
                        resolve(c.json({ error: 'No images found for the given query' }, 404));
                    } else {
                        cache.set(query, imageUrls);
                        const randomUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
                        const response: ImageResponse = {
                            url: randomUrl.replaceAll("!s1", "!d"),
                            time_taken: `${timeTaken} seconds`,
                            download_url: getDownloadUrl(randomUrl)
                        };

                        logger.info(`Responded with image URL in ${timeTaken} seconds`);
                        resolve(c.json(response));
                    }
                });
            });
        });
    });

    // Handle unsupported methods for the '/' endpoint
    app.post('/*', (c) => {
        return c.json({ error: 'Method Not Allowed' }, 405, { 'Content-Type': 'application/json' });
    });
    app.put('/*', (c) => {
        return c.json({ error: 'Method Not Allowed' }, 405, { 'Content-Type': 'application/json' });
    });
    app.delete('/*', (c) => {
        return c.json({ error: 'Method Not Allowed' }, 405, { 'Content-Type': 'application/json' });
    });
    app.patch('/*', (c) => {
        return c.json({ error: 'Method Not Allowed' }, 405, { 'Content-Type': 'application/json' });
    });
    app.options('/*', (c) => {
        return c.json({ error: 'Method Not Allowed' }, 405, { 'Content-Type': 'application/json' });
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    const docsPort = process.env.DOCS_PORT ? parseInt(process.env.DOCS_PORT) : 5001;
    logger.info(`Successfully started server on port ${port}`);

    serve({
        fetch: app.fetch,
        port
    });

    expressApp.listen(docsPort, () => {
        logger.info(`Swagger docs available at http://localhost:${docsPort}/docs`);
    });
} else {
    (async () => {
        const imageUrls = await fetchImageUrls(workerData);
        parentPort?.postMessage(imageUrls);
    })();
}