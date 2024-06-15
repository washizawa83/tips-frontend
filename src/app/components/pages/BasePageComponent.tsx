import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const contentWidth = 800;

export const BasePageComponent = ({ children }: Props) => {
    return (
        <Box sx={{ maxWidth: `${contentWidth}px`, margin: '0 auto' }}>
            {children}
        </Box>
    );
};
