import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice.js';
import api from '../services/api.js';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      dispatch(login(response.data));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-4">
      <div className="max-w-xl w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 lg:p-12 bg-gradient-to-br from-indigo-600 to-slate-900 text-white">
            <h1 className="text-4xl font-semibold">Task Manager</h1>
            <p className="mt-4 text-sm leading-6 text-slate-200">A simple workflow to manage projects, assign tasks, and track progress with fast authentication.</p>
            <div className="mt-10 rounded-3xl bg-white/10 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-200">Need an account?</p>
              <p className="mt-3 text-sm text-slate-200">Register as Admin or Member to start managing your projects immediately.</p>
            </div>
          </div>
          <div className="p-10 lg:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in with your email and password.</p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                Sign in
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              New here?{' '}
              <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;