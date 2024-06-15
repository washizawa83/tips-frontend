import Link from '@mui/material/Link';
import React from 'react';
import { theme } from '../../themes/theme';
export type AnchorLinkProps = {
    link: string;
    text?: string;
    icon?: JSX.Element;
};

export const TipsAnchorLink = (props: AnchorLinkProps) => {
    return (
        <Link
            className='text-tips-gray-text text-base font-medium'
            href={props.link}
            underline='none'
            sx={{ color: theme.palette.primary.contrastText }}
        >
            {props.icon}
            {props.text}
        </Link>
    );
};
