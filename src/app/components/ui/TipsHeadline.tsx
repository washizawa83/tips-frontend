import { Box } from '@mui/material';
import React from 'react';
import { theme } from '../../themes/theme';

type HeadlineProps = {
    text: string;
};

export const TipsHeadline = ({ text }: HeadlineProps) => {
    return (
        <Box sx={{ margin: '50px 0' }}>
            <Box
                sx={{
                    borderBottom:
                        `2px solid ${theme.palette.primary.contrastText}`,
                }}
            >
                <h2 className='text-3xl'>{text}</h2>
            </Box>
        </Box>
    );
};
