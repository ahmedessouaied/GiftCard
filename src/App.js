import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Write from './pages/Write';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './PrivateRoute'; 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/crud" element={<PrivateRoute element={<Write />} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
