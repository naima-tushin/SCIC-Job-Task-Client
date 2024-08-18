import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ProductList from '../Components/ProductList/ProductList';
import Pagination from '../Components/Pagination/Pagination';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Prodify | Home</title>
            </Helmet>
            <Navbar></Navbar>
            <ProductList></ProductList>
            <Footer></Footer>
        </div>
    );
};

export default Home;