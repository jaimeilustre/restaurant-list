import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as router from 'react-router-dom';
import HomePage from './HomePage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Home page with search function', () => {
	it('Render header', () => {
		render(<HomePage />);
		expect(screen.getByText('Home page')).toBeInTheDocument();
	});

	it('Test input typing', () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);
		
		const input = screen.getByPlaceholderText('Type postcode here');
		fireEvent.change(input, { target: { value: 'EC4M7RF'}});
		expect(input.value).toBe('EC4M7RF');
	});

	it('Navigate to restaurant list page when postcode is inputed', () => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText('Type postcode here');
		const button = screen.getByText('Search');

		fireEvent.change(input, { target: { value: 'EC4M7RF'}});
		fireEvent.click(button);

		expect(mockNavigate).toHaveBeenCalledWith('restaurants/EC4M7RF');
	})


})