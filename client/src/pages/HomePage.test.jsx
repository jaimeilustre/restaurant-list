import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

describe('Home page with search function', () => {
	it('Render header', () => {
		render(<HomePage />);
		expect(screen.getByText('Home page')).toBeInTheDocument();
	})
})