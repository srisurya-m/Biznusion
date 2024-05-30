import mongoose, { Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id?: string | mongoose.Types.ObjectId;
  username: string;
  registrationChallenge:string;
  loginChallenge:string;
  credentialPublicKey:string;
  credentialID:string;
  counter:number;
  email: string;
  photo: string;
  role?: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.Mixed,
      default: () => new mongoose.Types.ObjectId(),
      required: [true, "Please enter ID"],
    },
    username: {
      type: String,
      unique: [true, "this username is already taken"],
      required: [true, "Please enter Name"],
    },
    registrationChallenge: {
      type: String,
    },
    loginChallenge: {
      type: String,
    },
    credentialPublicKey: {
      type: String,
    },
    credentialID: {
      type: String,
    },
    counter: {
      type: Number,
    },
    email: {
      type: String,
      unique: [true, "this email already exists"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", schema);
