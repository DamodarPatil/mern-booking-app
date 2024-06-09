import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    try {
      console.log("Received registration request", req.body);

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log("User already exists");
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();
      console.log("User saved successfully");

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
