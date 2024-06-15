import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '&::after': {
        content: '""',
        display: 'block',
        width: '30%',
    },
};

export const ThreeColumnListComponent = ({ children }: Props) => {
    return (
        <Box sx={styles}>
            {children}
        </Box>
    );
};
