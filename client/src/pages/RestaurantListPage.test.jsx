import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import RestaurantListPage from './RestaurantListPage';
import axios from 'axios';

describe('Restaurant List Page', () => {
	it ('Render header', () => {
		render(<RestaurantListPage />);

		expect(screen.getByText('List of restaurants')).toBeInTheDocument();
	});
});