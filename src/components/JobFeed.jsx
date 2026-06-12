import { useState, useEffect } from 'react';
import axios from 'axios';

export default function JobFeed({ recruiter }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 State hooks for managing user search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Hardcoded category matching options for the pill selections
  const categories = [
    'All',
    '🍽️ Food Serving / Catering',
    '🧹 Cleaning / Housekeeping',
    '📦 Loading / Warehouse',
    '👷 Construction / Helper',
    '🛵 Delivery Rider',
    '🎪 Event Setup / Decoration'
  ];

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to remove this job listing?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
        alert("💼 Job listing removed successfully!");
        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (error) {
        console.error("❌ Delete failed:", error);
        alert("Failed to remove job card.");
      }
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatTime12Hour = (timeString) => {
    if (!timeString || !timeString.includes(':')) return timeString || 'Not specified';
    const [hour, minute] = timeString.split(':');
    const H = parseInt(hour, 10);
    const ampm = H >= 12 ? 'PM' : 'AM';
    const h = H % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  // ⚡ COMPUTE FILTERED RESULTS ON THE FLY:
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.jobType === selectedCategory;
    const matchesLocation = job.address?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesCategory && matchesLocation;
  });

  return (
    <div className="space-y-5">
      
      {/* 🔍 CONTROL SEARCH CENTER PANEL */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.02)] space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 tracking-wider mb-1.5 uppercase">
            🔍 Search Work Location
          </label>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type area name (e.g., Anna Nagar)..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 pl-4 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all placeholder-slate-400 font-semibold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
            🗂️ Filter by Category
          </label>
          <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black transition-all border shadow-sm ${
                  selectedCategory === cat 
                    ? 'bg-amber-400 text-slate-900 border-amber-400 shadow-amber-400/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? '🌐 All Work' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ⚠️ MODERN BRANDED SAFETY WARNING NOTICE */}
      <div className="bg-amber-50/80 border-l-4 border-amber-500 text-amber-950 p-4 rounded-xl rounded-l-none shadow-[0_4px_12px_rgba(217,119,6,0.03)] space-y-1.5">
        <div className="flex items-center space-x-2">
          <span className="text-base">⚠️</span>
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">Important Safety Notice</h3>
        </div>
        <p className="text-xs leading-relaxed font-semibold text-amber-900/90">
          This platform is built entirely in the public interest to assist individuals seeking daily wage and part-time employment. Please exercise caution when contacting individuals through this site. Because anyone can create an account and list an opening, always verify the recruiter's credentials, prioritize your safety when accepting a job, and ensure your payment terms are secure before starting work.
        </p>
      </div>

      {/* Feed Summary Header Row */}
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Works</h2>
        <span className="text-xs bg-amber-400/20 text-slate-900 border border-amber-400/20 font-black px-2.5 py-1 rounded-lg shadow-sm">
          {filteredJobs.length} listed
        </span>
      </div>

      {/* Loading & Empty States */}
      {loading && (
        <div className="text-center py-12 text-slate-500 font-bold text-sm flex items-center justify-center gap-2">
          <span className="animate-spin text-base">🔄</span> Accessing MongoDB Cloud...
        </div>
      )}
      
      {!loading && filteredJobs.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-400 border border-dashed border-slate-300 font-bold text-sm shadow-sm">
          📭 No job matches found for your active criteria filters.
        </div>
      )}

      {/* ⚡ JOB CARDS GRID LIST */}
      <div className="space-y-4.5">
        {!loading && filteredJobs.map((job) => (
          <div 
            key={job._id} 
            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_4px_25px_rgba(15,23,42,0.015)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.02)] transition-all space-y-4 relative overflow-hidden group"
          >
            
            {/* Top Row: Category Tag & Payout Badge */}
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1.5 flex-grow">
                <span className="inline-block bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg border border-slate-200/30">
                  {job.jobType || "🍽️ Food Serving"}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  📍 {job.address}
                </h3>
                {job.locationLink && (
                  <a 
                    href={job.locationLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-[11px] text-blue-600 font-black hover:underline bg-blue-50/60 px-2.5 py-1 rounded-lg border border-blue-100/40 transition-all shadow-sm"
                  >
                    🗺️ Open in Google Maps
                  </a>
                )}
              </div>
              
              {/* Vibrant Accent Earnings Badge */}
              <div className="text-right flex-shrink-0">
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-black text-xl px-3.5 py-1 rounded-xl shadow-sm">
                  ₹{job.amount}
                </div>
              </div>
            </div>

            {/* Middle Data Information Block Grid Layout */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-slate-50/80 rounded-xl p-3.5 text-xs text-slate-600 font-semibold border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">📅</span>
                <span>Date: <strong className="text-slate-800">{job.dateOfWork}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">⏰</span>
                <span>Timing: <strong className="text-slate-800">{formatTime12Hour(job.timing)}</strong></span>
              </div>
              
              <div className="flex items-center gap-2 col-span-2 border-t border-slate-200/50 pt-2.5 mt-0.5">
                <span className="text-slate-400 text-sm">💵</span>
                <span className="flex items-center gap-1.5 flex-wrap">
                  Payment: <strong className="text-slate-800">{job.paymentType || 'Spot Cash'}</strong>
                  {job.paymentType !== 'Spot Cash' && job.paymentTimeline && (
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md">
                      {job.paymentTimeline}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 col-span-2 border-t border-slate-200/50 pt-2.5">
                <span className="text-slate-400 text-sm">🚌</span>
                <span>
                  Travel Expenses: {' '}
                  {job.travelProvided === 'Yes' ? (
                    <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-bold">
                      ✅ Provided
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      ❌ Not Provided
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 col-span-2 border-t border-slate-200/50 pt-2.5">
                <span className="text-slate-400 text-sm">👤</span>
                <span>Recruiter: <strong className="text-slate-800">{job.recruiterName}</strong></span>
              </div>
            </div>

            {/* WhatsApp Only Explicit Warning Banner block */}
            {job.whatsappOnly && (
              <div className="bg-amber-50/60 text-amber-900 border border-amber-200/40 text-xs rounded-xl p-3 text-center font-bold">
                💬 WhatsApp Only! Recruiter requested no direct calls.
              </div>
            )}

            {/* Action Buttons Stack Panels */}
            <div className="space-y-2 pt-1">
              <a 
                href={`https://wa.me/91${job.phoneNumber}?text=Hi%20${encodeURIComponent(job.recruiterName)},%20I%20am%20interested%20in%20your%20job%20for%20${encodeURIComponent(job.jobType || 'Daily Wage Work')}%20at%20${encodeURIComponent(job.address)}.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-slate-900 hover:bg-amber-400 text-white hover:text-slate-900 font-black py-3 px-4 rounded-xl transition-all text-center text-xs tracking-wide shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.005]"
              >
                <span>💬</span> Apply via WhatsApp Chat
              </a>

              {recruiter && recruiter.id === job.recruiterId && (
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="block w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl transition-all text-center text-xs border border-rose-100"
                >
                  🗑️ Mark as Filled / Delete Listing
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}