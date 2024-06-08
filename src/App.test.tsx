import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App component', () => {
    test('renders home page', () => {
        render(<App />);
        const homeElement = screen.getByText(/ホーム/i);
        expect(homeElement).toBeInTheDocument();
    });
});
