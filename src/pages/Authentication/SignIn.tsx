import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.bestofficiel.com/api/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-1 inline-block" to="/auth/signin">
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Best Officiel
              </h2>
            </Link>
            <span className="mt-15 inline-block">
              <svg
                width="350"
                height="340"
                viewBox="0 0 350 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths here */}
              </svg>
            </span>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="p-12.5 sm:p-20">
            <h2 className="mb-9 text-2xl font-bold text-dark sm:text-title-xl2 dark:text-white">
              Sign In
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-dark dark:text-white dark:bg-boxdark"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-dark dark:text-white dark:bg-boxdark"
                  required
                />
              </div>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4">
              Don't have an account? <Link to="/auth/signup" className="text-blue-600">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
