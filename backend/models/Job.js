import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  recruiterName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappOnly: { type: Boolean, default: false },
  jobType: { type: String, required: true },
  dateOfWork: { type: String, required: true },
  timing: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, required: true, default: "Spot Cash" },
  paymentTimeline: { type: String, default: "" },
  address: { type: String, required: true },
  locationLink: { type: String, default: "" },
  
  travelProvided: { type: String, required: true, default: "No" }, // 👈 NEW: Radio selection field
  expiresAt: { 
    type: Date, 
    required: false 
  }
}, 
{ 
  timestamps: true ,
});

export default mongoose.model('Job', jobSchema);