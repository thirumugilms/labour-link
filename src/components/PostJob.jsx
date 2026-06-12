import { useState } from 'react';
import axios from 'axios';

export default function PostJob({ recruiter, setView }) {
  const [jobType, setJobType] = useState('🍽️ Food Serving / Catering');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); 
  const [amount, setAmount] = useState('600');
  const [paymentType, setPaymentType] = useState('Spot Cash'); 
  const [paymentTimeline, setPaymentTimeline] = useState('Same Day'); 
  const [address, setAddress] = useState('');
  const [whatsappOnly, setWhatsappOnly] = useState(false);
  const [locationLink, setLocationLink] = useState('');
  const [travelProvided, setTravelProvided] = useState('No');

  const handlePublish = async (e) => {
    e.preventDefault();

    const newJob = {
      recruiterId: recruiter.id,
      recruiterName: recruiter.name,
      phoneNumber: recruiter.phone,
      whatsappOnly,
      jobType,
      dateOfWork: date,
      timing: time, 
      amount: parseInt(amount),
      paymentType,   
      paymentTimeline: paymentType === 'Spot Cash' ? 'Immediate' : paymentTimeline, 
      address,
      locationLink,
      travelProvided
    };

    try {
      await axios.post('https://labour-link-hiq8.onrender.com/api/jobs', newJob);
      alert('🎉 SUCCESS! Job Card saved permanently to MongoDB!');
      setView('feed');
    } catch (error) {
      alert('Failed to publish job layout.');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.015)] space-y-6">
      
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
          <span className="text-amber-500">📢</span> Post a New Job
        </h2>
        <p className="text-xs text-slate-600 mt-1 font-bold">
          Posting as: <span className="text-slate-950 font-black underline">{recruiter.name}</span>
        </p>
      </div>
      
      <form onSubmit={handlePublish} className="space-y-5">
        
        {/* Job Category */}
        <div>
          {/* ⚡ UPDATED: Changed text-slate-400 to text-slate-700 (much darker and sharper) */}
          <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
            JOB CATEGORY / WORK TYPE *
          </label>
          <select 
            value={jobType} 
            onChange={(e) => setJobType(e.target.value)} 
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none cursor-pointer transition-all font-bold" 
            required
          >
            <option value="🍽️ Food Serving / Catering">🍽️ Food Serving / Catering</option>
            <option value="🧹 Cleaning / Housekeeping">🧹 Cleaning / Housekeeping</option>
            <option value="📦 Loading / Warehouse">📦 Loading / Warehouse</option>
            <option value="👷 Construction / Helper">👷 Construction / Helper</option>
            <option value="🛵 Delivery Rider">🛵 Delivery Rider</option>
            <option value="🎪 Event Setup / Decoration">🎪 Event Setup / Decoration</option>
          </select>
        </div>

        {/* WhatsApp Only Toggle Card */}
        <div className="flex items-center bg-amber-50/50 p-4 rounded-xl border border-amber-200/70 shadow-sm">
          <input 
            type="checkbox" 
            id="waToggle" 
            checked={whatsappOnly} 
            onChange={(e) => setWhatsappOnly(e.target.checked)} 
            className="h-4 w-4 text-slate-900 focus:ring-amber-400 accent-amber-400 border-slate-400 rounded cursor-pointer" 
          />
          <label htmlFor="waToggle" className="ml-3 text-xs font-black text-amber-950 cursor-pointer select-none">
            💬 WhatsApp Only (Block direct phone calls)
          </label>
        </div>

        {/* Date and Clock Input Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            {/* ⚡ UPDATED: High-contrast text label */}
            <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
              DATE *
            </label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all font-bold" 
              required 
            />
          </div>
          <div>
            {/* ⚡ UPDATED: High-contrast text label */}
            <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
              REPORTING TIME *
            </label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all font-bold" 
              required 
            />
          </div>
        </div>

        {/* Payment Amount */}
        <div>
          {/* ⚡ UPDATED: High-contrast text label */}
          <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
            PAYMENT AMOUNT *
          </label>
          <select 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full bg-slate-50 border border-slate-300 text-emerald-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none cursor-pointer transition-all font-black text-base" 
            required
          >
            <option value="600" className="font-bold text-slate-900">₹600</option>
            <option value="1000" className="font-bold text-slate-900">₹1000</option>
            <option value="1500" className="font-bold text-slate-900">₹1500</option>
          </select>
        </div>

        {/* Payment Method Group Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {/* ⚡ UPDATED: High-contrast text label */}
            <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
              PAYMENT MODE *
            </label>
            <select 
              value={paymentType} 
              onChange={(e) => setPaymentType(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none cursor-pointer transition-all font-bold" 
              required
            >
              <option value="Spot Cash">💵 Spot Cash</option>
              <option value="Online (GPay / PhonePe)">📱 Online (GPay / PhonePe)</option>
            </select>
          </div>

          {/* Conditional Render Timeline */}
          {paymentType !== 'Spot Cash' && (
            <div>
              {/* ⚡ UPDATED: High-contrast text label */}
              <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
                PAYMENT TIMELINE *
              </label>
              <select 
                value={paymentTimeline} 
                onChange={(e) => setPaymentTimeline(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none cursor-pointer transition-all font-bold" 
                required
              >
                <option value="Same Day (After Work)">⚡ Same Day (After Work)</option>
                <option value="Within 24 Hours">⏰ Within 24 Hours</option>
                <option value="Within 2-3 Days">🗓️ Within 2-3 Days</option>
              </select>
            </div>
          )}
        </div>

        {/* Workplace Address */}
        <div>
          {/* ⚡ UPDATED: High-contrast text label */}
          <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
            WORK AREA ADDRESS *
          </label>
          <textarea 
            rows="2" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter the specific area name (e.g., Anna Nagar, Near Metro Station)..." 
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all placeholder-slate-400 font-bold" 
            required
          />
        </div>

        {/* Google Maps Link Field */}
        <div>
          {/* ⚡ UPDATED: High-contrast text label */}
          <label className="block text-[11px] font-black text-slate-700 tracking-wider mb-1.5 uppercase">
            GOOGLE MAPS LINK (LOCATION)
          </label>
          <input 
            type="url" 
            value={locationLink} 
            onChange={(e) => setLocationLink(e.target.value)} 
            placeholder="Paste Google Maps Share Link (optional)..." 
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 focus:outline-none transition-all placeholder-slate-400 font-bold" 
          />
        </div>

        {/* Travel Expenses Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-2.5">
          {/* ⚡ UPDATED: High-contrast text label */}
          <label className="block text-[11px] font-black text-slate-800 tracking-wider uppercase">
            TRAVEL EXPENSES ( Bus Charge )? *
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center text-xs font-black text-slate-900 cursor-pointer select-none">
              <input 
                type="radio" 
                name="travelProvided" 
                value="Yes" 
                checked={travelProvided === 'Yes'} 
                onChange={(e) => setTravelProvided(e.target.value)} 
                className="h-4 w-4 text-slate-900 focus:ring-amber-400 accent-slate-900 border-slate-400 mr-2 cursor-pointer" 
                required
              />
              🚗 Yes (Allowance Provided)
            </label>
            <label className="flex items-center text-xs font-black text-slate-900 cursor-pointer select-none">
              <input 
                type="radio" 
                name="travelProvided" 
                value="No" 
                checked={travelProvided === 'No'} 
                onChange={(e) => setTravelProvided(e.target.value)} 
                className="h-4 w-4 text-slate-900 focus:ring-amber-400 accent-slate-900 border-slate-400 mr-2 cursor-pointer" 
                required
              />
              ❌ No Travel Allowance
            </label>
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="submit" 
          className="w-full bg-slate-900 hover:bg-amber-400 text-white hover:text-slate-900 font-black py-3.5 px-4 rounded-xl transition-all text-center text-xs tracking-wide shadow-md flex items-center justify-center gap-2 mt-2"
        >
          Publish Job Card
        </button>
      </form>
    </div>
  );
}