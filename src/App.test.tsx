import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react';
import App from './App';

describe('App component', () => {
    test('renders home page', () => {
        act(() => {
            render(<App />);
        });

        // "ホーム" テキストが表示されていることを確認します
        const homeElement = screen.getByText(/ホーム/i);
        expect(homeElement).toBeInTheDocument();
    });
});
