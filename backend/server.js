import 'dotenv/config'; // ⚡ MUST BE AT THE ABSOLUTE TOP OF THE FILE FOR ES MODULES
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import connectDB from './config/db.js';
import Recruiter from './models/Recruiter.js';
import Job from './models/Job.js';

const app = express();

// 读取隐藏的环境变量，如果没配置则默认使用 5000 端口
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// ==========================================
// AUTHENTICATION API ROUTES
// ==========================================

// Recruiter Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const existingUser = await Recruiter.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = new Recruiter({ name, phone, password: hashedPassword });
    await newRecruiter.save();

    res.status(201).json({ message: "Account created successfully! Please login." });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// Recruiter Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const recruiter = await Recruiter.findOne({ phone });
    if (!recruiter) {
      return res.status(400).json({ message: "Invalid Phone Number or Password" });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Phone Number or Password" });
    }

    res.json({ id: recruiter._id, name: recruiter.name, phone: recruiter.phone });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// ==========================================
// JOB API ROUTES
// ==========================================

// Post Job
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: "Failed to save job card", error: error.message });
  }
});

// Get All Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const allJobs = await Job.find().sort({ createdAt: -1 });
    res.json(allJobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
});

// Delete Job Listing
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job card not found" });
    }
    res.json({ message: "Job card deleted completely" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`👷 Labour Link backend listening at http://localhost:${PORT}`);
});