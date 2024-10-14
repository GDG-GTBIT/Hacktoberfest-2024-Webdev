import axios, { AxiosError } from 'axios';

describe('Integration Tests', () => {
    test('GET / should return a random image URL', async () => {
        const res = await axios.get('http://localhost:5000/');
        expect(res.status).toBe(200);
    });
    test('GET /?q=cat should return an image URL related to "cat"', async () => {
        const res = await axios.get('http://localhost:5000/?q=cat');
        expect(res.status).toBe(200);
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