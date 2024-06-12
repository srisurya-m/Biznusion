import { Date } from "mongoose";

export interface WebdevForm {
  name: string;
  phoneNumber: number;
  email: string;
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
  graduationYear: number;
  info: string;
  dob: string | number;
}

export interface ContactFormType {
  name: string;
  email: string;
  message: string;
}

export interface UserAppointmentType {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
}

export interface UserJoinAppointmentType {
  name: string;
  email: string;
}
