import { Request, Response } from "express";
import { DataAnalyst } from "../modals/DataAnalyst";
import { WebdevForm } from "../types/types";

export const dataAnalyst = async (
  req: Request<{}, {}, WebdevForm>,  // both webdev and data analyst forms are same so same type is being used
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

    let user = await DataAnalyst.find({ email });
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "You have already submitted application",
      });
    }
    const newuser = await DataAnalyst.create({
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
