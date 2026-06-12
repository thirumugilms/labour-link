import { useState } from 'react';
import axios from 'axios';

export default function Login({ setRecruiter, setView }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://labour-link-hiq8.onrender.com/api/auth/login', { phone, password });
      alert(`Welcome back, ${response.data.name}!`);
      
      // ⚡ This safely routes directly into handleLoginSuccess inside App.jsx now!
      setRecruiter(response.data); 
      setView('feed');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(15,23,42,0.02)] p-6 border border-slate-200/80 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-slate-900 mb-1">🔑 Recruiter Login</h2>
      <p className="text-xs text-slate-400 mb-5 font-normal">Log in to manage and post daily wage jobs.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-900 tracking-wider mb-1.5 uppercase">
            Phone Number *
          </label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="e.g., 9876543210" 
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all placeholder-slate-400 font-medium" 
            required 
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-900 tracking-wider mb-1.5 uppercase">
            Password *
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all placeholder-slate-400 font-medium" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-slate-900 hover:bg-amber-400 text-white hover:text-slate-900 font-bold py-3 px-4 rounded-xl transition-all text-center text-xs tracking-wide shadow-md flex items-center justify-center gap-2"
        >
          Login to Dashboard
        </button>
      </form>
      
      <p className="text-xs text-center text-slate-400 mt-5 font-normal">
        New here? {' '}
        <button 
          onClick={() => setView('signup')} 
          className="text-amber-500 font-semibold hover:underline"
        >
          Create an Account
        </button>
      </p>
    </div>
  );
}