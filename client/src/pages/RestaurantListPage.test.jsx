import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import RestaurantListPage from './RestaurantListPage';
import axios from 'axios';

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
	})

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
	})

});