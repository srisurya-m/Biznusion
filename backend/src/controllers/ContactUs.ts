import { addMinutes, subMinutes } from "date-fns";
import { format as formatTz } from "date-fns-tz";
import { Request, Response } from "express";
import { Appointments } from "../modals/Appointments";
import { ContactUs } from "../modals/ContactUs";
import {
  ContactFormType,
  UserAppointmentType,
  UserJoinAppointmentType,
} from "../types/types";
import {
  scheduleReminderEmailClient,
  scheduleReminderEmailExpert,
  sendMailAppointmentAndReminderClient,
  sendMailAppointmentAndReminderExpert,
} from "../utils/features";

export const contactUs = async (
  req: Request<{}, {}, ContactFormType>,
  res: Response
) => {
  try {
    const { name, email, message } = req.body;

    let user = await ContactUs.find({ email });
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "You have already submitted your message",
      });
    }
    const newUser = await ContactUs.create({
      name,
      email,
      message,
    });
    return res.status(201).json({
      success: true,
      message: `Dear ${name} your message is submitted successfully!`,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userAppointment = async (
  req: Request<{}, {}, UserAppointmentType>,
  res: Response
) => {
  try {
    const { name, email, preferredDate, preferredTime } = req.body;

    let user = await Appointments.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "You have already booked an appointment",
      });
    }
    let existingDate = await Appointments.find({
      preferredDate: new Date(preferredDate),
      preferredTime,
    });
    if (existingDate.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Sorry this slot is already booked",
      });
    }
    const newUser = await Appointments.create({
      name,
      email,
      preferredDate: new Date(preferredDate),
      preferredTime,
    });
    scheduleReminderEmailExpert(
      name,
      email,
      preferredDate,
      preferredTime,
      process.env.REMINDER_EMAIL_SUBJECT_EXPERT!,
      process.env.REMINDER_EMAIL_TEXT_EXPERT!
    );
    scheduleReminderEmailClient(
      name,
      email,
      preferredDate,
      preferredTime,
      process.env.REMINDER_EMAIL_SUBJECT_CLIENT!,
      process.env.REMINDER_EMAIL_TEXT_CLIENT!
    );
    sendMailAppointmentAndReminderExpert(
      name,
      email,
      preferredDate,
      preferredTime,
      process.env.APPOINTMENT_CONFIRMATION_SUBJECT_EXPERT!,
      process.env.APPOINTMENT_CONFIRMATION_TEXT_EXPERT!
    );
    sendMailAppointmentAndReminderClient(
      name,
      email,
      preferredDate,
      preferredTime,
      process.env.APPOINTMENT_CONFIRMATION_SUBJECT_CLIENT!,
      process.env.APPOINTMENT_CONFIRMATION_TEXT_CLIENT!
    );
    return res.status(201).json({
      success: true,
      message: `Dear ${name} your appointment is registered successfully!`,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinAppointment = async (
  req: Request<{}, {}, UserJoinAppointmentType>,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    if (
      name === process.env.EXPERT_USERNAME &&
      email === process.env.EXPERT_EMAIL
    ) {
      return res.status(200).json({
        success: true,
        message: `Dear Expert navigating you further`,
      });
    }

    let user = await Appointments.findOne({ email, name });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Please Schedule your Appointment",
      });
    }

    const timeZone = "Asia/Kolkata";
    const currentDate = new Date();

    // Convert preferred date and time to local time zone
    const preferredDate = new Date(user.preferredDate);
    const [time, period] = user.preferredTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    preferredDate.setHours(hour, minute, 0, 0);

    // Calculate start and end windows for joining
    const startWindow = subMinutes(preferredDate, 5); // 5 minutes before
    const endWindow = addMinutes(
      preferredDate,
      Number(process.env.CALL_DURATION_IN_MINS)
    );

    // Convert start and end windows to local time zone
    const formattedStartWindow = formatTz(startWindow, "MMMM do yyyy, h:mm a", {
      timeZone,
    });
    const formattedEndWindow = formatTz(endWindow, "MMMM do yyyy, h:mm a", {
      timeZone,
    });

    // Check if current date and preferred date are the same
    const currentDateStr = currentDate.toISOString().substring(0, 10);
    const preferredDateStr = preferredDate.toISOString().substring(0, 10);
    const day = preferredDate.getDate();
    const month = preferredDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = preferredDate.getFullYear();
    const formattedPreferredDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;

    if (currentDateStr !== preferredDateStr) {
      return res.status(200).json({
        success: false,
        message: `Dear ${name}, you can only join the call on your preferred date which is ${formattedPreferredDate}`,
      });
    }

    // Check conditions for joining
    if (currentDate < startWindow) {
      return res.status(200).json({
        success: false,
        message: `Dear ${name}, you can join the call from ${formattedStartWindow}`,
      });
    }

    if (currentDate > endWindow) {
      return res.status(200).json({
        success: false,
        message: `Dear ${name}, your scheduled session has ended consider booking an other one`,
      });
    }

    await Appointments.findOneAndDelete({ name, email }, { new: true });

    return res.status(200).json({
      success: true,
      message: `Dear ${name} navigating you further`,
    });
  } catch (error) {
    console.log(error);
  }
};
