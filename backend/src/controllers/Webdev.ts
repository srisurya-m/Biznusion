import { Request, Response } from "express";
import { WebdevForm } from "../types/types";
import { Webdev } from "../modals/Webdev";

export const webdev = async (
  req: Request<{}, {}, WebdevForm>,
  res: Response
) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      address,
      degree,
      university,
      major,
      skills,
      experience,
      projects,
      certifications,
      referenceName,
      linkedinProfile,
      portfolio,
      graduationYear,
      info,
      dob,
    } = req.body;

    let user = await Webdev.find({ email });
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "You have already submitted application",
      });
    }
    const newuser = await Webdev.create({
      name,
      phoneNumber,
      email,
      address,
      degree,
      university,
      major,
      skills,
      experience,
      projects,
      certifications,
      referenceName,
      linkedinProfile,
      portfolio,
      graduationYear,
      info,
      dob: new Date(dob),
    });
    return res.status(201).json({
      success: true,
      message: `Dear ${name} your application is submitted successfully!`,
      newuser,
    });
  } catch (error) {
    console.log(error);
  }
};
