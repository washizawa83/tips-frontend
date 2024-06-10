import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import TerminalIcon from '@mui/icons-material/Terminal';
import TimelineIcon from '@mui/icons-material/Timeline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';
import { theme } from '../../themes/theme';
import { AnchorLink, AnchorLinkProps } from '../ui/anchor-link';

interface Props {
    drawerWidth: number;
    detectionOpenSidebarEmit: boolean;
}

const sidebarNavItem: AnchorLinkProps[] = [
    {
        text: 'ホーム',
        link: '/',
        icon: <HomeIcon />,
    },
    {
        text: '投稿',
        link: '/post',
        icon: <TerminalIcon />,
    },
    {
        text: 'タイムライン',
        link: '#',
        icon: <TimelineIcon />,
    },
    {
        text: 'グローバルリンク',
        link: '#',
        icon: <LinkIcon />,
    },
];

export const Sidebar = ({ drawerWidth, detectionOpenSidebarEmit }: Props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    React.useEffect(() => {
        handleDrawerToggle();
    }, [detectionOpenSidebarEmit]);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <List>
                {sidebarNavItem.map((navItem) => (
                    <ListItem
                        key={navItem.text}
                        disablePadding
                        className='mt-10 px-7'
                    >
                        <AnchorLink
                            text={navItem.text}
                            link={navItem.link}
                            icon={navItem.icon}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box>
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label='mailbox folders'
            >
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            top: '40px',
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};
