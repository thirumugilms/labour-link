import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyGigs({ recruiter }) {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs and filter by this recruiter's ID
  const fetchMyJobs = async () => {
    try {
      const response = await axios.get('https://labour-link-hiq8.onrender.com/api/jobs');
      const filtered = response.data.filter(job => job.recruiterId === recruiter.id);
      setMyJobs(filtered);
      loading(false);
    } catch (error) {
      console.error("❌ Error fetching your jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, [recruiter.id]);

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure this job is filled? It will be permanently removed.")) {
      try {
        await axios.delete(`https://labour-link-hiq8.onrender.com/api/jobs/${jobId}`);
        alert("💼 Listing removed successfully!");
        // Update local state instantly
        setMyJobs(myJobs.filter(job => job._id !== jobId));
      } catch (error) {
        console.error("❌ Delete failed:", error);
        alert("Failed to remove job card.");
      }
    }
  };

  const formatTime12Hour = (timeString) => {
    if (!timeString || !timeString.includes(':')) return timeString || 'Not specified';
    const [hour, minute] = timeString.split(':');
    const H = parseInt(hour, 10);
    const ampm = H >= 12 ? 'PM' : 'AM';
    const h = H % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  return (
    <div className="space-y-5">
      
      {/* 🌟 BRANDED MIDNIGHT & AMBER MANAGEMENT CONSOLE HEADER */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-[0_4px_25px_rgba(15,23,42,0.05)]">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-amber-400">💼</span> Recruiter Console
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Logged in as: <span className="font-bold underline text-slate-200">{recruiter.name}</span>
        </p>
        <div className="mt-3 bg-amber-400 text-slate-900 px-3 py-1.5 rounded-xl inline-block text-xs font-black shadow-sm">
          📊 Total Postings: {myJobs.length} active gigs
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-500 font-bold text-sm animate-pulse flex items-center justify-center gap-2">
          <span>🔄</span> Loading your active listings...
        </div>
      )}
      
      {/* Empty State Layout */}
      {!loading && myJobs.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-400 border border-dashed border-slate-300 font-bold text-sm shadow-sm">
          📥 You haven't published any active job cards yet. Click "Post a Job" to get started!
        </div>
      )}

      {/* ⚡ ACTIVE RECRUITER POSTINGS GRID LIST */}
      <div className="space-y-4">
        {!loading && myJobs.map((job) => (
          <div 
            key={job._id} 
            className="bg-white rounded-2xl p-5 border border-slate-200/70 border-l-4 border-l-amber-400 shadow-[0_4px_25px_rgba(15,23,42,0.015)] space-y-4 transition-all"
          >
            
            {/* Top Row: Category Pill & Price */}
            <div className="flex justify-between items-start gap-3">
              <span className="inline-block bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg border border-slate-200/30">
                {job.jobType}
              </span>
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-black text-xl px-3.5 py-1 rounded-xl shadow-sm">
                ₹{job.amount}
              </div>
            </div>

            {/* Middle Job Meta Specifications Box */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-slate-50/80 rounded-xl p-3.5 text-xs text-slate-600 font-semibold border border-slate-100">
              <div className="flex items-center gap-2 col-span-2">
                <span className="text-slate-400 text-sm">📍</span>
                <span>Venue: <strong className="text-slate-800">{job.address}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">📅</span>
                <span>Date: <strong className="text-slate-800">{job.dateOfWork}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">⏰</span>
                <span>Reporting: <strong className="text-slate-800">{formatTime12Hour(job.timing)}</strong></span>
              </div>
              <div className="flex items-center gap-2 col-span-2 border-t border-slate-200/50 pt-2.5 mt-0.5">
                <span className="text-slate-400 text-sm">💵</span>
                <span>
                  Payout: <strong className="text-slate-800">{job.paymentType}</strong> {job.paymentTimeline && `(${job.paymentTimeline})`}
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
            </div>

            {/* Bottom Action Trigger */}
            <button
              onClick={() => handleDeleteJob(job._id)}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-black py-3 px-4 rounded-xl transition-all text-center text-xs tracking-wide border border-rose-100/60 shadow-sm"
            >
              🗑️ Mark Job as Filled (Remove Listing)
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}