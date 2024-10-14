import axios, { AxiosError } from 'axios';

describe('Unit Tests', () => {
    test('GET / should return a random image URL', async () => {
        const res = await axios.get('http://localhost:5000/');
        expect(res.status).toBe(200);
        const data = res.data;
        expect(data).toHaveProperty('url');
        expect(data).toHaveProperty('time_taken');
        expect(data).toHaveProperty('download_url');
    });
    test('GET /?q=cat should return an image URL related to the keyword', async () => {
        const res = await axios.get('http://localhost:5000/?q=cat');
        expect(res.status).toBe(200);
        const data = res.data;
        expect(data).toHaveProperty('url');
        expect(data).toHaveProperty('time_taken');
        expect(data).toHaveProperty('download_url');
    });
    test('GET /invalid should return 404', async () => {
        try {
            await axios.get('http://localhost:5000/invalid');
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(404);
            } else {
                throw error;
            }
        }
    });
});