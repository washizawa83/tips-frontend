import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header component', () => {
    test('calls openSidebarEmit on menu button click', () => {
        const mockOpenSidebarEmit = jest.fn();
        render(
            <BrowserRouter>
                <Header openSidebarEmit={mockOpenSidebarEmit} />
            </BrowserRouter>,
        );
        const menuButton = screen.getByLabelText(/open drawer/i);
        fireEvent.click(menuButton);
        expect(mockOpenSidebarEmit).toHaveBeenCalledTimes(1);
    });
});
