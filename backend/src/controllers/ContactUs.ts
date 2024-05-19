import { Request, Response } from "express";
import { ContactUs } from "../modals/ContactUs";
import { ContactFormType } from "../types/types";

export const contactUs = async (
  req: Request<{}, {}, ContactFormType>, 
  res: Response
) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    let user = await ContactUs.find({ email });
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "You have already submitted your message",
      });
    }
    const newuser = await ContactUs.create({
      name,
      email,
      message,
    });
    return res.status(201).json({
      success: true,
      message: `Dear ${name} your message is submitted successfully!`,
      newuser,
    });
  } catch (error) {
    console.log(error);
  }
};
