import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, List, ListItem } from '@mui/material';
import React from 'react';
import { AnchorLink, AnchorLinkProps } from '../ui/anchor-link';

const iconColor = '#F1F0FA';
const anchorLinkProps: AnchorLinkProps[] = [
    {
        text: '通知',
        link: '#',
        icon: <NotificationsIcon sx={{ color: iconColor }} />,
    },
    {
        text: '設定',
        link: '#',
        icon: <SettingsIcon sx={{ color: iconColor }} />,
    },
    {
        text: 'ログアウト',
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
        <div className='bg-tips-gray'>
            <div className='flex justify-between place-items-center max-w-screen-2xl h-10 px-2.5'>
                <div style={logoStyle}></div>
                <div>
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
                </div>
            </div>
        </div>
    );
};
