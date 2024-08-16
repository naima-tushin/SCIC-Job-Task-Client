import React from 'react';
import { FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#808080] text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover lg:text-lg text-base font-medium uppercase">Home</a>
                <a className="link link-hover lg:text-lg text-base font-medium uppercase">Products</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={24} className="fill-current" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} className="fill-current" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={24} className="fill-current" />
                    </a>
                    <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={24} className="fill-current" />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok size={24} className="fill-current" />
                    </a>
                </div>
            </nav>
            <aside>
                <p className='lg:text-xl font-medium'>Copyright © {new Date().getFullYear()} - All right reserved by Prodify</p>
            </aside>
        </footer>
    );
};

export default Footer;
