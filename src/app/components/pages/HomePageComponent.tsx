import { Box } from '@mui/material';
import React from 'react';
import { CardComponent } from '../ui/CardComponent';
import { HeadlineComponent } from '../ui/HeadlineComponent';

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
                {tags.map((tag) => (
                    <Box sx={{ margin: '20px 0', width: '30%' }}>
                        <CardComponent
                            title={tag.name}
                            tips={tag.tips}
                            image={tag.image}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
