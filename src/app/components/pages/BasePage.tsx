import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    allowAuthenticate: boolean;
};

const contentWidth = 800;

export const BasePage = ({ children, allowAuthenticate }: Props) => {
    const { authStatus } = useAuthenticator((context) => [context.authStatus]);

    const renderChildComponent = (): ReactNode => {
        if (allowAuthenticate === false) return children;
        if (authStatus === 'authenticated') return children;
        return <Authenticator />;
    };
    return (
        <Box sx={{ maxWidth: `${contentWidth}px`, margin: '0 auto' }}>
            {renderChildComponent()}
        </Box>
    );
};
