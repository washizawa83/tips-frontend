import { Box, Typography } from '@mui/material';
import React from 'react';
import { theme } from '../../themes/theme';
import { CardComponent } from '../ui/CardComponent';
import { HeadlineComponent } from '../ui/HeadlineComponent';
import { ThreeColumnListComponent } from '../ui/ThreeColumnListComponent';
import { BasePageComponent } from './BasePageComponent';

const tags = [
    {
        name: 'Python',
        tips: 30,
        image:
            'https://img.icons8.com/?size=100&id=13441&format=png&color=000000',
    },
    {
        name: 'Ruby',
        tips: 5,
        image:
            'https://img.icons8.com/?size=100&id=LAJ92sqzzioo&format=png&color=000000',
    },
    {
        name: 'Typescript',
        tips: 12,
        image:
            'https://img.icons8.com/?size=100&id=HcQEdKCkXUs3&format=png&color=000000',
    },
    {
        name: 'React',
        tips: 7,
        image:
            'https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000',
    },
    {
        name: 'AWS',
        tips: 3,
        image:
            'https://img.icons8.com/?size=100&id=33039&format=png&color=000000',
    },
];

export const HomePageComponent = () => {
    return (
        <BasePageComponent>
            <HeadlineComponent text='Tags' />
            <ThreeColumnListComponent>
                {tags.map((tag) => (
                    <Box sx={{ margin: '20px 0', width: '30%' }}>
                        <CardComponent
                            title={tag.name}
                            image={tag.image}
                        >
                            <Typography
                                color={theme.palette.primary.contrastText}
                                gutterBottom
                                variant='h6'
                                component='div'
                                sx={{ fontSize: '14px' }}
                            >
                                {`tips: ${tag.tips}`}
                            </Typography>
                        </CardComponent>
                    </Box>
                ))}
            </ThreeColumnListComponent>
        </BasePageComponent>
    );
};
