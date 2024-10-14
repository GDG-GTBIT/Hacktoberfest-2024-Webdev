import axios, { AxiosError } from 'axios';

describe('End-to-End Tests', () => {
    test('GET / should return a random image URL', async () => {
        const res = await axios.get('http://localhost:5000/');
        expect(res.status).toBe(200);
    });
    test('GET /?q=cat should return an image URL related to "cat"', async () => {
        const res = await axios.get('http://localhost:5000/?q=cat');
        expect(res.status).toBe(200);
    });
    test('GET /docs should render the Swagger docs page', async () => {
        const res = await axios.get('http://localhost:5001/');
        expect(res.status).toBe(200);
        expect(res.data).toContain('Swagger UI');
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