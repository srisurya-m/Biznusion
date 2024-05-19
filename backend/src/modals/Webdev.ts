import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter Your ph number"],
  },
  email: {
    type: String,
    unique: [true, "Email id already exits"],
    required: [true, "Please enter Email"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  degree: {
    type: String,
    required: [true, "Please enter your degree"],
  },
  university: {
    type: String,
    required: [true, "Please enter your university"],
  },
  major: {
    type: String,
    required: [true, "Please enter your major"],
  },
  skills: {
    type: String,
    required: [true, "Please enter your skills"],
  },
  experience: {
    type: String,
    required: [true, "Please enter your experience"],
  },
  projects: {
    type: String,
    required: [true, "Please enter your projects"],
  },
  certifications: {
    type: String,
    required: [true, "Please enter your certifications"],
  },
  referenceName: {
    type: String,
  },
  linkedinProfile: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  graduationYear: {
    type: Number,
    required: [true, "Please enter your graduation year"],
  },
  info: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, "Please enter DOB"],
  },
},
{
  timestamps: true,
});

export const Webdev = mongoose.model("Webdev", schema);