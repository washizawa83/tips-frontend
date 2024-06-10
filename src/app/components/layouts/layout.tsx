import { Box } from '@mui/material';
import React from 'react';
import { ReactNode, useState } from 'react';
import { theme } from '../../themes/theme';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface Props {
    children: ReactNode;
}
const drawerWidth = 240;

export const Layout = ({ children }: Props) => {
    const [eventDetection, setEventDetection] = useState(false);
    const handleOpenSidebarEmit = () => setEventDetection(!eventDetection);

    return (
        <Box>
            <Header openSidebarEmit={handleOpenSidebarEmit} />
            <Box sx={{ display: 'flex' }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                    detectionOpenSidebarEmit={eventDetection}
                />
                <Box
                    component='main'
                    className='grow p-3'
                    sx={{
                        sm: `calc(100% - ${drawerWidth}px)`,
                        minHeight: 'calc(100vh - 40px)',
                        maxHeight: 'calc(100vh - 40px)',
                        // backgroundColor: theme.palette.primary.dark,

                        backgroundColor: 'hsl(258deg 31% 24%)',
                        backgroundImage:
                            'radial-gradient(at 80% 0%, hsla(231,70%,44%,0.44) 0px, transparent 50%), radial-gradient(at 30% 84%, hsla(268,83%,63%,0.32) 0px, transparent 50%)',
                        color: theme.palette.primary.contrastText,
                        overflowY: 'scroll',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
