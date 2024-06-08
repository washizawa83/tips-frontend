import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './app/components/layouts/layout';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<h1>ホーム</h1>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
