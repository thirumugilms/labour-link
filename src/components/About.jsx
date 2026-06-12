import { useState } from 'react';

export default function About() {
  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-amber-400">ℹ️</span> About Labour Link
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-normal">Connecting daily workers and local recruiters transparently.</p>
      </div>

      {/* Main Narrative Card */}
      <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(15,23,42,0.015)] p-5 border border-slate-200/70 space-y-4 text-sm text-slate-600 leading-relaxed font-normal">
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-1">🌱 Our Mission</h3>
          <p className="text-slate-600 font-medium">
            Labour Link was built with <strong className="text-slate-900 font-semibold">societal interest</strong> at its core. Our primary objective is to empower daily wage laborers, casual workers, and part-time job seekers by providing direct, open access to immediate work opportunities without any middleman commissions.
          </p>
        </div>

        <div className="border-t border-slate-100 my-2" />

        <div>
          <h3 className="font-bold text-slate-900 text-base mb-1">🤝 How It Works</h3>
          <p className="text-slate-600 font-medium">
            We simplify the hiring process for local businesses, catering managers, event planners, and individuals. Recruiters can quickly post short-term gigs, list transparent payout terms, and pin exact workplace navigation routes. Workers can then filter jobs by category or area and connect with recruiters instantly through a single tap via WhatsApp.
          </p>
        </div>

        <div className="border-t border-slate-100 my-2" />

        <div>
          <h3 className="font-bold text-slate-900 text-base mb-1">🛡️ Core Values & Community Safety</h3>
          <p className="text-slate-600 font-medium">
            Because our platform is decentralized and accessible to everyone, we highly emphasize community safety. We urge all users to remain cautious, verify job locations, establish clear communication regarding payment timings, and cross-check recruiter details before committing to work.
          </p>
        </div>
      </div>

      {/* Impact Badges */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-4 shadow-sm">
          <p className="text-xl">💰</p>
          <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mt-1">0% Commission</p>
        </div>
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-4 shadow-sm">
          <p className="text-xl">⚡</p>
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-1">Direct Connect</p>
        </div>
      </div>
    </div>
  );
}