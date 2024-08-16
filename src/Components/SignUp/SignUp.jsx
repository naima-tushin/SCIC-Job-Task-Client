import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from '../../assets/images/Login.png';
// import img1 from '../../assets/images/Mobile.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../firebase/firebase.config';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Large Screens */}
            <div className="hidden lg:flex hero min-h-screen mx-auto w-[75%]">
                <div className="hero-content flex-col lg:flex-row-reverse gap-24">
                    <div className="relative text-center lg:text-left">
                        <img className='w-[550px] h-[600px]' src={img} alt="Login" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[250px] h-[110px] bg-[#152A16] opacity-70 rounded-lg flex flex-col items-center justify-center">
                                <h1 className="text-lg font-medium text-[#156BCA]">Create Account</h1>
                                <p className="text-xl text-white">Fill in Your Information</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                            <Link to="/" className="w-2 h-2 bg-blue-500 rounded-full block"></Link>
                            <Link to="/signIn" className="w-2 h-2 bg-gray-400 rounded-full block"></Link>
                        </div>
                    </div>
                    <div className="card w-[450px] shrink-0">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h1 className='uppercase text-3xl font-medium text-[#4285F3]'>Prodify</h1>
                            <h2 className='text-2xl font-bold font-poppins'>Sign Up for an Account</h2>
                            <p className='text-sm font-medium text-slate-500 leading-5 tracking-wide mb-1'>
                                Welcome! By clicking the sign-up button, you agree to Prodify Terms and Service and acknowledge the <span className='text-[#4285F3] underline'>Privacy and Policy</span>
                            </p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="@username"
                                    className="input text-xs font-semibold input-bordered h-10"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input text-xs font-semibold input-bordered h-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input text-xs font-semibold input-bordered h-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="absolute top-2/3 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold">Confirm Password</span>
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-type password"
                                    className="input text-xs font-semibold input-bordered h-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <div className="absolute top-2/3 right-0 pr-3 flex items-center text-sm leading-5">
                                    <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                            <div className='flex'>
                                <input type="checkbox" id="terms" className="mr-2" required />
                                <label htmlFor="terms" className="text-xs text-[#4285F3] font-poppins">Accept Terms of Service</label>
                            </div>
                            <div className="form-control items-center justify-center mt-2">
                                <button type="submit" className="rounded-md py-3 font-poppins text-xs text-white w-[200px] bg-[#4285F3]">Sign Up</button>
                            </div>
                            <div className="text-center mt-1 font-poppins">
                                <p className="font-medium text-xs ">Already Have an Account? <Link to="/signIn" className="font-semibold text-xs text-[#156BCA] underline">Log In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Small Screens */}
            <div className="lg:hidden w-full h-screen relative">
                {/* <img className="w-full h-full object-cover" src={img1} alt="Login" /> */}
                <div className="absolute inset-0 flex flex-col items-center text-white transition-opacity duration-300 z-10 mt-5">
                    {!showForm && (
                        <>
                            <h1 className="uppercase text-3xl text-[#4285F3] mb-3">Logo</h1>
                            <h2 className="text-xl mb-3 text-[#1A2531] font-bold font-poppins">Sign In To Your Account</h2>
                            <p className="text-xs font-medium text-[#D1D1D1] leading-5 tracking-wide mb-10 px-7">
                                Welcome! By clicking the sign-up button, you agree to Zenitood Terms and Service and acknowledge the <span className="text-[#4285F3] underline">Privacy and Policy</span>
                            </p>
                            <div className="w-[250px] h-[110px] bg-[#152A16] opacity-70 rounded-lg flex flex-col items-center justify-center">
                                <button onClick={() => setShowForm(true)} className="text-lg font-medium text-[#156BCA]">Create Account</button>
                                <p className="text-xl text-white">Fill in Your Information</p>
                            </div>
                        </>
                    )}
                    {showForm && (
                        <>
                            <h1 className="uppercase text-3xl text-[#4285F3] mb-3">Logo</h1>
                            <div className="trounded-lg flex flex-col items-center justify-center">
                                <button onClick={() => setShowForm(false)} className="text-lg font-medium">Create Account</button>
                                <p className="text-xl">Fill in Your Information</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Popup form */}
                {showForm && (
                    <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-30 z-20">
                        <div className="bg-white w-full max-w-md rounded-t-3xl shadow-lg overflow-y-auto relative">
                            <div className="p-3">
                                <form onSubmit={handleSubmit}>
                                    <h1 className="text-center text-lg font-bold">Sign Up</h1>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xs font-semibold">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="@username"
                                            className="input text-xs font-semibold input-bordered h-9"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xs font-semibold">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="input text-xs font-semibold input-bordered h-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text text-xs font-semibold">Password</span>
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="input text-xs font-semibold input-bordered h-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="absolute top-2/3 right-0 pr-3 flex items-center text-sm leading-5">
                                            <button type="button" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text text-xs font-semibold">Confirm Password</span>
                                        </label>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-type password"
                                            className="input text-xs font-semibold input-bordered h-9"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <div className="absolute top-2/3 right-0 pr-3 flex items-center text-sm leading-5">
                                            <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                    <div className="flex mt-2">
                                        <input type="checkbox" id="terms" className="mr-2" required />
                                        <label htmlFor="terms" className="text-xs text-[#4285F3] font-poppins">Accept Terms of Service</label>
                                    </div>
                                    <div className="form-control items-center justify-center mt-3">
                                        <button type="submit" className="rounded-md py-2 font-poppins text-xs text-white w-[200px] bg-[#4285F3]">Sign Up</button>
                                    </div>
                                    <div className="text-center mt-1 font-poppins">
                                        <p className="font-medium text-xs">Already Have an Account? <Link to="/signIn" className="font-semibold text-xs text-[#156BCA] underline">Log In</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-[30px] left-0 right-0 flex justify-center space-x-2 z-10">
                    <Link to="/" className="w-2 h-2 bg-blue-500 rounded-full block"></Link>
                    <Link to="/signIn" className="w-2 h-2 bg-gray-400 rounded-full block"></Link>
                    <Link to="" className="w-2 h-2 bg-gray-400 rounded-full block"></Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
