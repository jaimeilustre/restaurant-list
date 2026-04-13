import app from './app.js';
import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios' , () => ({
	// method: vi.fn()
	default: {
		get: vi.fn()
	}
}));

describe ('GET /restaurants/:postcode', () => {
	it('Return 200 when successful', async () => {
		const res = await request(app).get('/restaurants/EC4M7RF');
		expect(res.statusCode).toBe(200);
	})

	it ('Return restaurants array', async () => {
		const res = await request(app).get('/restaurants/EC4M7RF');
		expect(res.body).toHaveProperty('restaurants');
	})

	it ('Return restaurant data for 1 restaurant', async () => {
		axios.get.mockResolvedValue({
			data: {
				restaurants: [{ name: 'Test' }]
			}
		});

		const res = await request(app).get('/restaurants/EC4M7RF');
		expect(res.body.restaurants.length).toBe(1);
	})

	it ('Return 500 when API call fails', async () => {
		axios.get.mockRejectedValue(new Error('API failed'));
		const res = await request(app).get('/restaurants/EC4M7RF');
		expect(res.statusCode).toBe(500);
		expect(res.body.message).toBe('Error getting postcode');
	})
});


