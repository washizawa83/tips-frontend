import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { HeaderComponent } from './HeaderComponent';

describe('Header component', () => {
    test('calls openSidebarEmit on menu button click', () => {
        const mockOpenSidebarEmit = jest.fn();
        render(
            <BrowserRouter>
                <HeaderComponent openSidebarEmit={mockOpenSidebarEmit} />
            </BrowserRouter>,
        );
        const menuButton = screen.getByLabelText(/open drawer/i);
        fireEvent.click(menuButton);
        expect(mockOpenSidebarEmit).toHaveBeenCalledTimes(1);
    });
});
