import mongoose from "mongoose";

const schema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please enter the image"],
  },
  clientName: {
    type: String,
    required: [true, "Please enter Your client name"],
  },
  description: {
    type: String,
    required: [true, "Please enter Your description"],
  },
  
},
{
  timestamps: true,
});

export const Webdev = mongoose.model("Webdev", schema);