import app from './app.js';
import request from 'supertest';
import { describe, it, expect } from 'vitest'

describe ('GET /restaurants/:postcode', () => {
	it('Return 200 when successful', async () => {
		const res = await request(app).get('/restaurants/EC4M7RF');
	expect(res.statusCode).toBe(200);
	})
})