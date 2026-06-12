import { useState } from 'react';
import axios from 'axios';

export default function Signup({ setView }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://labour-link-hiq8.onrender.com/api/auth/signup', { name, phone, password });
      alert(response.data.message);
      setView('login'); // Redirect to login page on success
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-1">📝 Recruiter Registration</h2>
      <p className="text-xs text-gray-500 mb-5">Create a free account to instantly publish job listings.</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">FULL NAME *</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g., Ramesh Kumar" 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required 
          />
        </div>

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
          <label className="block text-xs font-bold text-gray-700 mb-1">CREATE PASSWORD *</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Minimum 6 characters" 
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required 
          />
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg transition text-center text-sm shadow-md">
          Register Account
        </button>
      </form>

      <p className="text-xs text-center text-gray-500 mt-4">
        Already have an account? <button onClick={() => setView('login')} className="text-blue-600 font-bold hover:underline">Log In</button>
      </p>
    </div>
  );
}