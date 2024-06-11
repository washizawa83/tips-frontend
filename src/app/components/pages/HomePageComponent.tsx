import { Box } from '@mui/material';
import React from 'react';
import { CardComponent } from '../ui/CardComponent';
import { HeadlineComponent } from '../ui/HeadlineComponent';

export const HomePageComponent = () => {
    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <HeadlineComponent text='Tags' />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    '&::after': {
                        content: '""',
                        display: 'block',
                        width: '30%',
                    },
                }}
            >
                <Box sx={{ margin: '20px 0', width: '30%' }}>
                    <CardComponent title={'Python'} />
                </Box>
                <Box sx={{ margin: '20px 0', width: '30%' }}>
                    <CardComponent title={'Python'} />
                </Box>
                <Box sx={{ margin: '20px 0', width: '30%' }}>
                    <CardComponent title={'Python'} />
                </Box>
                <Box sx={{ margin: '20px 0', width: '30%' }}>
                    <CardComponent title={'Python'} />
                </Box>
                <Box sx={{ margin: '20px 0', width: '30%' }}>
                    <CardComponent title={'Python'} />
                </Box>
            </Box>
        </Box>
    );
};
