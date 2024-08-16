import React, { useState, useEffect } from 'react';
import profileImagePlaceHolder from '../../assets/images/PP.png';
import { auth, signOut } from '../../firebase/firebase.config'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        photoURL: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user')); 
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('user');
        setUser({
            name: '',
            email: '',
            photoURL: ''
        });
        navigate('/');
    };

    return (
        <div className="navbar lg:py-3 lg:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase">
                        <li><a className='lg:text-lg'>Home</a></li>
                        <li><a className='lg:text-lg'>Products</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost lg:text-2xl uppercase font-bold bg-gray-100 hover:bg-black hover:text-white">Prodify</a>
            </div>
            <div className="navbar-center hidden lg:flex uppercase">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='lg:text-lg'>Home</a></li>
                    <li><a className='lg:text-lg'>Products</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col">
                                <span className="font-medium">{user.name || 'No Name'}</span>
                                <span className="text-sm text-gray-500">{user.email || 'No Email'}</span>
                            </div>
                            <img
                                src={user.photoURL || profileImagePlaceHolder} 
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    )}
                    <div className="mr-2 cursor-pointer text-[#F15E4A] font-medium text-sm"
                        onClick={handleLogout}>
                            LogOut
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
