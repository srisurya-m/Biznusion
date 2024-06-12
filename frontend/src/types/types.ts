import mongoose from 'mongoose';

export interface FormDataType {
  name: string;
  email: string;
  phoneNumber: number;
  dob: Date | null;
  address: string;
  degree: string;
  university: string;
  major: string;
  skills: string;
  experience: string;
  projects: string;
  certifications: string;
  referenceName: string;
  linkedinProfile: string;
  portfolio: string;
  info: string;
  graduationYear: number;
}

export interface ContactFormType {
  name: string;
  email: string;
  message: string;
}

export type User={
  username: string;
  email: string;
  photo: string;
  _id: string | mongoose.Types.ObjectId;
  registrationChallenge?:string;
  loginChallenge?:string;
  credentialPublicKey?:string;
  credentialID?:string;
  counter?:number;
  role?:string;
}


export interface UserJoinedPayload {
  email: string;
  id: string;
}

export interface IncomingCallPayload {
  from: string;
  offer: RTCSessionDescriptionInit;
}

export interface NegoNeededIncomingCallPayload {
  from: string;
  offer: RTCSessionDescriptionInit;
}

export interface CallAcceptedPayload {
  from: string;
  ans: RTCSessionDescriptionInit;
}

export interface NegoNeededFinalPayload {
  ans: RTCSessionDescriptionInit;
}

export interface ScheduleCallFormData {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
}