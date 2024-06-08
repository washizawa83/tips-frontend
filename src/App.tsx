import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './app/components/layouts/layout';
import { theme } from './app/themes/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<h1>ホーム</h1>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
