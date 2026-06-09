import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-dark-card p-10 rounded-3xl border border-dark-border shadow-2xl">
        <div className="text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code2 className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="text-dark-muted mt-2">Start organizing your code today.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm">{error}</div>}

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:outline-none transition-colors"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:outline-none transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:outline-none transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group"
          >
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-dark-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
