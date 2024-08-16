import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ProductCard from '../Components/ProductCard/ProductCard';
import ProductsList from '../Components/ProductList/ProductList';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Footer></Footer>
            <ProductCard></ProductCard>
            <ProductsList></ProductsList>
        </div>
    );
};

export default Home;