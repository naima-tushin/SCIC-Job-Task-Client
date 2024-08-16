import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar py-3 px-8">
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
                        <li><a className='text-lg'>Home</a></li>
                        <li><a className='text-lg'>Products</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl uppercase font-bold bg-gray-200 hover:bg-black hover:text-white">Prodify</a>
            </div>
            <div className="navbar-center hidden lg:flex uppercase">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='text-lg'>Home</a></li>
                    <li><a className='text-lg'>Products</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn text-xl hover:bg-black hover:text-white border-0 shadow-[0]">Login/Register</div>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
                        <li><a className='text-lg justify-center'>Login</a></li>
                        <li><a className='text-lg justify-center'>Register</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;