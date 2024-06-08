import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

describe('Header component', () => {
    test('renders anchor links in large screens', () => {
        render(
            <BrowserRouter>
                <Header openSidebarEmit={jest.fn()} />
            </BrowserRouter>,
        );
        const notificationLink = screen.getByText(/通知/i);
        const settingsLink = screen.getByText(/設定/i);
        const logoutLink = screen.getByText(/ログアウト/i);
        expect(notificationLink).toBeInTheDocument();
        expect(settingsLink).toBeInTheDocument();
        expect(logoutLink).toBeInTheDocument();
    });

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
