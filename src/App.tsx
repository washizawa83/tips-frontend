import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutComponent } from './app/components/layouts/LayoutComponent';
import { PostPageComponent } from './app/components/pages/PostPageComponent';
import { theme } from './app/themes/theme';

function App() {
    return (
        <Box className='min-w-full max-w-full min-h-screen max-h-screen'>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <LayoutComponent>
                        <Routes>
                            <Route path='/' element={<h1>ホーム</h1>} />
                            <Route
                                path='/post'
                                element={<PostPageComponent />}
                            />
                        </Routes>
                    </LayoutComponent>
                </BrowserRouter>
            </ThemeProvider>
        </Box>
    );
}

export default App;
