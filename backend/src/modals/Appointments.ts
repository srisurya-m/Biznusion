import mongoose, { Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: string;
  email: string;
  preferredDate: Date;
  preferredTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "this email already exists"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },
    preferredDate: {
      type: Date,
      required: [true, "Please enter your preferred date"],
    },
    preferredTime: {
      type: String,
      required: [true, "Please enter your preferred time"],
    },
  },
  {
    timestamps: true,
  }
);

export const Appointments = mongoose.model<IUser>("Appointments", schema);
