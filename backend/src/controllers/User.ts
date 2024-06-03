import { NextFunction, Request, Response } from "express";
import { User } from "../modals/User";
import ErrorHandler from "../utils/utility-class";
import mongoose from "mongoose";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { existsSync, rm, unlink } from "fs";
import path from "path";

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, photo, _id } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (user.username !== username) {
        return res.status(200).json({
          success: false,
          message:
            "Invalid credentials or maybe you used different method to signIn",
        });
      }
      if (user.photo === process.env.DEFAULT_PHOTO) {
        user.photo = photo;
        user = await User.findOneAndUpdate({ email }, user, { new: true });
      }
      return res.status(200).json({
        success: true,
        message: `Welcome ${user?.username}`,
        user,
      });
    }

    if (!username || !email)
      return next(new ErrorHandler("Please add all fields", 400));

    if (!photo) {
      const defaultPhoto = process.env.DEFAULT_PHOTO!;
      user = await User.create({
        username,
        email,
        photo: defaultPhoto,
        _id: _id || new mongoose.Types.ObjectId(),
      });
    }

    user = await User.create({
      username,
      email,
      photo,
      _id: _id || new mongoose.Types.ObjectId(),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${user.username}`,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerChallengeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const userId = isObjectId ? new mongoose.Types.ObjectId(id) : id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });

    if (user.credentialPublicKey) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user,
      });
    }

    const challengePayload = await generateRegistrationOptions({
      rpID: process.env.rpID!,
      rpName: process.env.rpName!,
      userName: user.username,
    });
    user.registrationChallenge = challengePayload.challenge;
    const userChallenge = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Fingerprint Registered",
      userChallenge,
      options: challengePayload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerVerifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const userId = isObjectId ? new mongoose.Types.ObjectId(id) : id;
    const { cred } = req.body;
    const data = await User.findById(userId);
    if (!data || !data.registrationChallenge)
      return res.status(404).json({
        success: false,
        message: "Challenge doesn't exist",
      });
    const verificationResult = await verifyRegistrationResponse({
      expectedChallenge: data.registrationChallenge,
      response: cred,
      expectedOrigin: process.env.CLIENT!,
      expectedRPID: process.env.expectedRPID,
    });

    if (!verificationResult.verified)
      return res.status(404).json({
        success: false,
        message: "Couldn't verify",
      });
    data.credentialPublicKey = Buffer.from(
      verificationResult.registrationInfo!.credentialPublicKey
    ).toString("base64");
    data.credentialID = Buffer.from(
      verificationResult.registrationInfo!.credentialID
    ).toString("base64");
    data.counter = verificationResult.registrationInfo!.counter;
    const key = await User.findByIdAndUpdate(userId, data, { new: true });

    return res.status(200).json({
      success: true,
      message: "Public key created",
      key,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Please register your fingerprint first",
      });
    }
    const options = await generateAuthenticationOptions({
      rpID: process.env.rpID!,
    });
    if (user) {
      user.loginChallenge = options.challenge;
      await User.findOneAndUpdate({ username }, user);
      return res.status(201).json({
        success: true,
        message: "login challenge created successfully",
        options,
      });
    }
    return res.status(201).json({
      success: false,
      message: "login challenge wasn't created",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginVerifyUser = async (req: Request, res: Response) => {
  try {
    const { username, cred } = req.body;
    const trimmedUsername = username.trim();
    const user = await User.findOne({ username: trimmedUsername });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Please register first",
      });
    }
    const loginChallenge = user?.loginChallenge;
    if (!loginChallenge) {
      return res.status(404).json({
        success: false,
        message: "Login challenge wasn't found",
      });
    }
    const credentialPublicKey = Uint8Array.from(
      Buffer.from(user!.credentialPublicKey, "base64")
    );
    const credentialID = user!.credentialID;
    const counter = user!.counter;
    const result = await verifyAuthenticationResponse({
      expectedChallenge: loginChallenge,
      response: cred,
      expectedOrigin: process.env.CLIENT!,
      expectedRPID: process.env.expectedRPID!,
      authenticator: {
        credentialID,
        counter,
        credentialPublicKey,
      },
    });
    if (!result.verified)
      return res.status(200).json({
        success: false,
        message: "We are not able to authenticate",
      });
    return res.status(201).json({
      success: true,
      message: "login  successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Invalid Id", 400));
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.body;
    const id = req.params.id;
    const photo = req.file;
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const userId = isObjectId ? new mongoose.Types.ObjectId(id) : id;
    let user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("User not Found", 400));

    if (photo) {
      const filename = path.basename(user.photo);
      const filePath = path.join("uploads", "users", filename);
      if (existsSync(filePath)) {
        // Delete the old photo file
        rm(filePath, (err) => {
          if (err) {
            console.log("Error deleting old photo:", err);
          } else {
            console.log("Old photo deleted successfully");
          }
        });
      } else {
        console.log("Old photo does not exist:", filePath);
      }
      user.photo = `${process.env.VITE_SERVER}/${photo.path}`;
    }

    user.username = username;
    user.email = email;
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
