import { useState } from 'react';
import JobFeed from './components/JobFeed';
import PostJob from './components/PostJob';
import Login from './components/Login';
import Signup from './components/Signup';
import MyGigs from './components/MyGigs';
import About from './components/About';

export default function App() {
  const [view, setView] = useState('feed');
  
  // Check localStorage on boot so refreshing doesn't clear the session!
  const [recruiter, setRecruiter] = useState(() => {
    const savedSession = localStorage.getItem('userSession');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const handleLoginSuccess = (userData) => {
    setRecruiter(userData);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setRecruiter(null);
    localStorage.removeItem('userSession');
    setView('feed');
  };

  return (
    // 🌟 BRAND CANVASES CHANGED: Swapped gray/white for a beautiful warm amber-tint background
    <div className="min-h-screen bg-[#faf7f2] font-sans flex flex-col w-full antialiased text-slate-800">
      
      {/* 🌟 PREMIUM MIDNIGHT & AMBER FLOATING NAVBAR */}
      <div className="sticky top-0 z-50 w-full px-3 pt-3">
        <nav className="max-w-xl mx-auto bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 shadow-[0_12px_40px_rgba(15,23,42,0.15)] px-4 py-3.5 w-full transition-all">
          <div className="flex flex-col gap-3 w-full">
            
            {/* Top Row: Brand Logo & Language Dropdown */}
            <div className="flex flex-row justify-between items-center w-full">
              <h1 
                className="text-lg font-black tracking-tight cursor-pointer text-white select-none flex items-center gap-1.5" 
                onClick={() => setView('feed')}
              >
                <span className="text-xl">👷</span>
                Labour <span className="text-slate-900 bg-amber-400 px-2 py-0.5 rounded-lg shadow-sm font-black">Link</span>
              </h1>

              {/* Modern Language Selector Widget Button Pill */}
              <div className="flex items-center">
                <select 
                  onChange={(e) => window.triggerLanguageTranslation(e.target.value)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold rounded-xl px-2.5 py-1.5 border border-slate-700 focus:outline-none cursor-pointer transition-all shadow-inner"
                >
                  <option value="" className="text-slate-900 bg-white font-medium">🌐 Language</option>
                  <option value="en" className="text-slate-900 bg-white font-medium">English</option>
                  <option value="hi" className="text-slate-900 bg-white font-medium">हिन्दी (Hindi)</option>
                  <option value="ta" className="text-slate-900 bg-white font-medium">தமிழ் (Tamil)</option>
                  <option value="te" className="text-slate-900 bg-white font-medium">తెలుగు (Telugu)</option>
                  <option value="ml" className="text-slate-900 bg-white font-medium">മലയാളം (Malayalam)</option>
                  <option value="kn" className="text-slate-900 bg-white font-medium">ಕನ್ನಡ (Kannada)</option>
                  <option value="mr" className="text-slate-900 bg-white font-medium">मराठी (Marathi)</option>
                  <option value="bn" className="text-slate-900 bg-white font-medium">বাংলা (Bengali)</option>
                </select>
              </div>
            </div>
            
            {/* Bottom Row: Minimalist Tab Menu Selection */}
            <div className="flex flex-wrap items-center justify-start gap-1 w-full border-t border-slate-800 pt-2.5">
              <button 
                onClick={() => setView('feed')} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  view === 'feed' ? 'bg-amber-400 text-slate-900 shadow-sm font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => setView('about')} 
                className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  view === 'about' ? 'bg-amber-400 text-slate-900 shadow-sm font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                About
              </button>
              
              {recruiter ? (
                <>
                  <button 
                    onClick={() => setView('mygigs')} 
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      view === 'mygigs' ? 'bg-amber-400 text-slate-900 shadow-sm font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    My Gigs
                  </button>
                  <button 
                    onClick={() => setView('post')} 
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      view === 'post' ? 'bg-amber-400 text-slate-900 shadow-sm font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Post a Job
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all ml-auto"
                  >
                    Logout ({recruiter?.name ? recruiter.name.split(' ')[0] : 'User'})
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setView('login')} 
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all ml-auto ${
                    view === 'login' || view === 'signup' ? 'bg-amber-400 text-slate-900 font-black shadow-md' : 'bg-amber-400 text-slate-900 hover:bg-amber-500 font-bold'
                  }`}
                >
                  Recruiter Portal
                </button>
              )}
            </div>
            
          </div>
          <div id="google_translate_hidden_engine" className="w-0 h-0 opacity-0 absolute pointer-events-none" />
        </nav>
      </div>

      {/* 🌟 UNIFIED MAIN LAYOUT CONTAINER */}
      <main className="w-full max-w-xl mx-auto p-4 pb-24 flex-grow">   
        {view === 'feed' && <JobFeed recruiter={recruiter} />}
        {view === 'post' && recruiter && <PostJob recruiter={recruiter} setView={setView} />}
        {view === 'login' && <Login setRecruiter={handleLoginSuccess} setView={setView} />}
        {view === 'signup' && <Signup setView={setView} />}
        {view === 'mygigs' && recruiter && <MyGigs recruiter={recruiter} />}
        {view === 'about' && <About />}
      </main>

      {/* 🌟 UNIFIED MODERN BRANDED FOOTER */}
      <footer className="w-full bg-slate-900 text-slate-400 text-center py-6 px-4 border-t border-slate-800 text-xs mt-auto">
        <div className="max-w-xl mx-auto space-y-1.5 w-full">
          <p className="font-semibold text-slate-300">© 2026 Labour Link. All rights reserved.</p>
          <p className="text-slate-500">
            Developed with 💛 by <span className="text-amber-400 font-semibold tracking-wide hover:underline cursor-pointer">the_cyberer</span>
          </p>
        </div>
      </footer>

    </div>
  );
}