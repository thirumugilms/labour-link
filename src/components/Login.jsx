import { useState } from 'react';
import axios from 'axios';

export default function Login({ setRecruiter, setView }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { phone, password });
      alert(`Welcome back, ${response.data.name}!`);
      
      // ⚡ This safely routes directly into handleLoginSuccess inside App.jsx now!
      setRecruiter(response.data); 
      setView('feed');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-1">🔑 Recruiter Login</h2>
      <p className="text-xs text-gray-500 mb-5">Log in to manage and post daily wage jobs.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">PHONE NUMBER *</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="e.g., 9876543210" 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">PASSWORD *</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required 
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition text-center text-sm shadow-md">
          Login
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        New here? <button onClick={() => setView('signup')} className="text-blue-600 font-bold hover:underline">Create an Account</button>
      </p>
    </div>
  );
}