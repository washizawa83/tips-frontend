import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import { theme } from '../../themes/theme';
import { AnchorLink, AnchorLinkProps } from '../ui/anchor-link';

const iconColor = '#dcd9e7';
const anchorLinkProps: AnchorLinkProps[] = [
    {
        link: '#',
        icon: <NotificationsIcon sx={{ color: iconColor }} />,
    },
    {
        link: '#',
        icon: <SettingsIcon sx={{ color: iconColor }} />,
    },
    {
        link: '#',
        icon: <LogoutIcon sx={{ color: iconColor }} />,
    },
];

const logoStyle = {
    background: 'url(/images/logo.png)',
    width: '30px',
    height: '30px',
    backgroundSize: 'cover',
};

type HeaderProps = {
    openSidebarEmit: () => void;
};

export const Header = (props: HeaderProps) => {
    const onClickMenuButton = () => props.openSidebarEmit();
    return (
        <Box sx={{ backgroundColor: theme.palette.primary.light }}>
            <Box className='flex justify-between place-items-center h-10 px-2.5'>
                <Box style={logoStyle}></Box>
                <Box>
                    <Box
                        component='nav'
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <List sx={{ display: 'flex' }}>
                            {anchorLinkProps.map((props, index) => (
                                <ListItem
                                    key={index}
                                    sx={{ marginLeft: 2, whiteSpace: 'nowrap' }}
                                >
                                    <AnchorLink
                                        text={props.text}
                                        link={props.link}
                                        icon={props.icon}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ mr: 2, display: { sm: 'none' } }}>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={onClickMenuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
