import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ** Backend integration will happen here **
    // For now, we'll just log the details to the console.
    console.log('Attempting to log in with:');
    console.log('Email:', email);
    console.log('Password:', password);
    // Later, you would use axios or fetch to send this to your Spring Boot backend.
    // For example:
    // axios.post('/api/auth/login', { email, password })
    //   .then(response => { /* handle success, save token, redirect */ })
    //   .catch(error => { /* handle error */ });
    alert('Login functionality is for demonstration. Check the console (F12) for details.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-bg-light">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Meeting & Task Planner
          </h1>
          <p className="mt-2 text-gray-500">Welcome back! Please log in to your account.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white transition-colors duration-300 bg-brand-teal rounded-md hover:bg-brand-teal-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
            >
              Log In
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;