import mongoose from "mongoose";
import { createTransport } from "nodemailer";
import schedule from "node-schedule";
import { toZonedTime, format, fromZonedTime, toDate } from "date-fns-tz";
import { subMinutes } from "date-fns";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri)
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const sendMailAppointmentAndReminderClient = (
  name: string,
  email: string,
  preferredDate: string,
  preferredTime: string,
  subject: string,
  text: string
) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.COMPANY_PASS,
    },
  };
  let transporter = createTransport(config);
  let message = {
    from: process.env.COMPANY_EMAIL,
    to: email,
    subject: subject,
    text: text
      .replace("name", name)
      .replace("[Preferred Date]", preferredDate)
      .replace("[Preferred Time]", preferredTime)
      .replace(/\\n/g, "\n"),
  };
  transporter.sendMail(message);
};
export const sendMailAppointmentAndReminderExpert = (
  name: string,
  email: string,
  preferredDate: string,
  preferredTime: string,
  subject: string,
  text: string
) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.COMPANY_PASS,
    },
  };
  let transporter = createTransport(config);
  let message = {
    from: process.env.COMPANY_EMAIL,
    to: process.env.EXPERT_EMAIL,
    subject: subject.replace("[Client Name]", name),
    text: text
      .replace("[Client Name]", name)
      .replace("[Client Email]", email)
      .replace("[Preferred Date]", preferredDate)
      .replace("[Preferred Time]", preferredTime)
      .replace(/\\n/g, "\n"),
  };
  transporter.sendMail(message);
};

export const scheduleReminderEmailClient = (
  name: string,
  email: string,
  preferredDate: string,
  preferredTime: string,
  subject: string,
  text: string
) => {
  // console.log(preferredDate)
  const timeZone = "Asia/Kolkata";
  const [time, period] = preferredTime.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Create a date object with the preferred date and time in the specified time zone
  const preferredDateTimeString = `${preferredDate.split("T")[0]}T${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
  const zonedPreferredDateTime = toDate(preferredDateTimeString, { timeZone });

  // Calculate reminder date by subtracting 5 minutes
  const reminderDate = subMinutes(zonedPreferredDateTime, 5);

  // Convert reminder date to UTC
  const reminderDateUtc = fromZonedTime(reminderDate, timeZone);

  schedule.scheduleJob(reminderDateUtc, () => {
    const preferredDateString = format(zonedPreferredDateTime, "yyyy-MM-dd", {
      timeZone,
    });
    const preferredTimeString = format(zonedPreferredDateTime, "hh:mm a", {
      timeZone,
    });

    sendMailAppointmentAndReminderClient(
      name,
      email,
      preferredDateString,
      preferredTimeString,
      subject,
      text
    );
  });

  console.log(`Scheduled reminder email for ${name} on ${reminderDate}`);
};
export const scheduleReminderEmailExpert = (
  name: string,
  email: string,
  preferredDate: string,
  preferredTime: string,
  subject: string,
  text: string
) => {
  const timeZone = "Asia/Kolkata";
  const [time, period] = preferredTime.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Create a date object with the preferred date and time in the specified time zone
  const preferredDateTimeString = `${preferredDate.split("T")[0]}T${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
  const zonedPreferredDateTime = toDate(preferredDateTimeString, { timeZone });

  // Calculate reminder date by subtracting 5 minutes
  const reminderDate = subMinutes(zonedPreferredDateTime, 5);

  // Convert reminder date to UTC
  const reminderDateUtc = fromZonedTime(reminderDate, timeZone);

  // console.log(`Preferred DateTime (Zoned): ${zonedPreferredDateTime}`);
  // console.log(`Reminder Date (Zoned): ${reminderDate}`);
  // console.log(`Reminder Date (UTC): ${reminderDateUtc}`);
  // console.log(`Current DateTime (UTC): ${new Date().toISOString()}`);

  schedule.scheduleJob(reminderDateUtc, () => {
    const preferredDateString = format(zonedPreferredDateTime, "yyyy-MM-dd", {
      timeZone,
    });
    const preferredTimeString = format(zonedPreferredDateTime, "hh:mm a", {
      timeZone,
    });

    sendMailAppointmentAndReminderExpert(
      name,
      email,
      preferredDateString,
      preferredTimeString,
      subject,
      text
    );
  });
  console.log(`Scheduled reminder email for expert on `, reminderDateUtc);
};
