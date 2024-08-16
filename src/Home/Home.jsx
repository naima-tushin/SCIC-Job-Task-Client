import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ProductCard from '../Components/ProductCard/ProductCard';
import ProductsList from '../Components/ProductList/ProductList';
import Pagination from '../Components/Pagination/Pagination';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <ProductsList></ProductsList>
            <ProductCard></ProductCard>
            <Pagination></Pagination>
            <Footer></Footer>
        </div>
    );
};

export default Home;