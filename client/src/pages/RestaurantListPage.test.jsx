import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import RestaurantListPage from './RestaurantListPage';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('axios' , () => ({
	default: {
		get: vi.fn()
	}
}));

describe('Restaurant List Page', () => {
	
	it ('Render header', () => {
		render(<RestaurantListPage />);
		expect(screen.getByText('List of restaurants')).toBeInTheDocument();
	});

	it('Shows loading word to test async behaviour', () => {
		render(<RestaurantListPage />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('Render restaurant names from API', async () => {
		axios.get.mockResolvedValue({
			data: {
				restaurants: [
					{ id: 1, name: 'Test restaurant'}
				]
			}
		});
		render(<RestaurantListPage />);
		const restaurant = await screen.findByText('Test restaurant');
		expect(restaurant).toBeInTheDocument();
	});

	it('Fetch restaurants using inputted postcode', async () => {
		axios.get.mockResolvedValue({
			data: { restaurants: [] }
		});

		render(
			<MemoryRouter initialEntries={['/restaurants/EC4M7RF']}>
				<Routes>
					<Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
				</Routes>
			</MemoryRouter>
		);

		await screen.findByText('Loading...');
		expect(axios.get).toHaveBeenCalledWith(
			expect.stringContaining('EC4M7RF')
		);
	});

	it('Render restaurant details', async () => {
		axios.get.mockResolvedValue({
			data: {
				restaurants: [
					{
						id: 1,
						name: 'Test restaurant',
						address: {
							city: 'London',
							firstLine: "1 Street",
							postalCode: "123"
						},
						rating: {
							starRating: 5,
							count: 100
						},
						cuisines: [{name: 'Italian'}]
					}
				]
			}
		});

		render(<RestaurantListPage />);
		expect(await screen.findByText('Test restaurant')).toBeInTheDocument();
		expect(screen.getByText('Italian')).toBeInTheDocument();
	});

});