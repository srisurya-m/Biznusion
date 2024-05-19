import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name"],
  },
  email: {
    type: String,
    unique: [true, "Email id already exits"],
    required: [true, "Please enter Email"],
  },
  message: {
    type: String,
    required: [true, "Please enter your message"],
  },
},
{
  timestamps: true,
});

export const ContactUs = mongoose.model("ContactUs", schema);