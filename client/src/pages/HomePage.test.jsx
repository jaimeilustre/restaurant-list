import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

describe('Home page with search function', () => {
	it('Render header', () => {
		render(<HomePage />);
		expect(screen.getByText('Home page')).toBeInTheDocument();
	})
	
	it('Test input typing', () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);
		
		const input = screen.getByPlaceholderText('Type postcode here');
		fireEvent.change(input, { target: { value: 'EC4M7RF'}});
		expect(input.value).toBe('EC4M7RF');
	})
})