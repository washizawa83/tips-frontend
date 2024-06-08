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
                >
                </Sidebar>
                <Box
                    component='main'
                    className='grow p-3 overflow-y-auto'
                    sx={{
                        width: {
                            sm: `calc(100% - ${drawerWidth}px)`,
                            minHeight: 'calc(100vh - 40px)',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
