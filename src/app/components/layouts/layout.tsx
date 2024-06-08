import React from 'react';
import { ReactNode, useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface Props {
    children: ReactNode;
}

export const Layout = ({ children }: Props) => {
    const [eventDetection, setEventDetection] = useState(false);
    const handleOpenSidebarEmit = () => setEventDetection(!eventDetection);

    return (
        <div>
            <Header openSidebarEmit={handleOpenSidebarEmit} />
            <Sidebar detectionOpenSidebarEmit={eventDetection}>
                {children}
            </Sidebar>
        </div>
    );
};
