import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from '../../assets/images/sign.avif';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../firebase/firebase.config';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Added state for image URL
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
            // Create user with Firebase
            await createUserWithEmailAndPassword(auth, email, password);

            // Create user in the backend
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    imageUrl, 
                }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify({
                    name: name || '',
                    email: email || '',
                    photoURL: imageUrl || '',
                }));
                navigate('/home');
            } else {
                setError(result.message || 'Error creating user');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Prodify | SignUp</title>
            </Helmet>
            {/* Large Screens */}
            <div className="hidden lg:flex hero min-h-screen mx-auto w-[75%]">
                <div className="hero-content flex-col lg:flex-row-reverse gap-24">
                    <div className="relative text-center lg:text-left">
                        <img className='w-[550px] h-[600px] object-cover opacity-60' src={img} alt="Login" />
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
                            <h1 className='uppercase text-2xl font-medium text-[#4285F3]'>Prodify</h1>
                            <h2 className='text-lg font-bold'>Sign Up for an Account</h2>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Image URL</span> {/* New field for image URL */}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    className="input text-xs font-semibold input-bordered h-10"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
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
                                <label htmlFor="terms" className="text-xs text-[#4285F3]">Accept Terms of Service</label>
                            </div>
                            <div className="form-control items-center justify-center mt-2">
                                <button type="submit" className="rounded-md py-3 text-xs text-white w-[200px] bg-[#4285F3]">Sign Up</button>
                            </div>
                            <div className="text-center mt-1">
                                <p className="font-medium text-xs ">Already Have an Account? <Link to="/signIn" className="font-semibold text-xs text-[#156BCA] underline">Log In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Small Screens */}
            <div className="lg:hidden w-full h-screen relative">
            <img className="w-full h-full object-cover opacity-60" src={img} alt="Login" />
                <div className="absolute inset-0 flex flex-col items-center text-white transition-opacity duration-300 z-10 mt-5">
                    {!showForm && (
                        <>
                            <h1 className="uppercase text-3xl text-[#4285F3] mb-3">Prodify</h1>
                            <h2 className="text-xl mb-3 text-[#1A2531] font-bold">Sign Up for an Account</h2>
                            <p className="text-xs font-medium text-black leading-5 tracking-wide mb-10 px-7">
                                Welcome! By clicking the sign-up button, you agree to Zenitood Terms and Service and acknowledge the <span className="text-[#4285F3] underline">Privacy and Policy</span>
                            </p>
                            <button className="rounded-md py-2 px-5 bg-[#4285F3] text-white" onClick={() => setShowForm(true)}>Create Account</button>
                        </>
                    )}

                    {showForm && (
                        <form className="bg-[#F1F1F1] p-5 absolute bottom-0 w-full h-4/5 flex flex-col items-center rounded-t-3xl" onSubmit={handleSubmit}>
                            <button className="text-right text-[#4285F3] text-xl" onClick={() => setShowForm(false)}>X</button>
                            <h2 className="text-2xl font-bold text-[#1A2531] mt-5">Sign Up</h2>
                            <p className="text-xs text-[#1A2531] font-medium mb-3">Fill in your details to create your account</p>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input text-xs font-semibold input-bordered h-10 mb-3 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="input text-xs font-semibold input-bordered h-10 mb-3 w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="input text-xs font-semibold input-bordered h-10 mb-3 w-full"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input text-xs font-semibold input-bordered h-10 mb-3 w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-3">
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="input text-xs font-semibold input-bordered h-10 mb-3 w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-22">
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm mb-2">{error}</p>
                            )}
                            <input type="checkbox" id="terms" className="mr-2" required />
                            <label htmlFor="terms" className="text-xs text-[#4285F3]">Accept Terms of Service</label>
                            <button type="submit" className="rounded-md py-3 text-xs text-white w-full bg-[#4285F3] mt-5">Sign Up</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
