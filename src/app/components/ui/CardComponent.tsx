import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { theme } from '../../themes/theme';

type CardProps = {
    title: string;
    image?: string;
    children?: ReactNode;
};

export const CardComponent = ({ title, image, children }: CardProps) => {
    return (
        <Card
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: `${theme.palette.primary.light}`,
            }}
        >
            <CardMedia
                sx={{ height: 50, width: 50, margin: '10px' }}
                image={image ? image : `/images/logo.png`}
                title='green iguana'
            />
            <CardContent
                sx={{ padding: '10px', height: 50, boxSizing: 'content-box' }}
            >
                <Typography
                    color={theme.palette.primary.contrastText}
                    gutterBottom
                    variant='h6'
                    component='div'
                >
                    {title}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
};
