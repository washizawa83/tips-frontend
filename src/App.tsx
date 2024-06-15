import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './app/components/layouts/Layout';
import { HomePageComponent } from './app/components/pages/HomePageComponent';
import { PostPageComponent } from './app/components/pages/PostPageComponent';
import { theme } from './app/themes/theme';

function App() {
    return (
        <Box className='min-w-full max-w-full min-h-screen max-h-screen'>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<HomePageComponent />} />
                            <Route
                                path='/post'
                                element={<PostPageComponent />}
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </Box>
    );
}

export default App;
