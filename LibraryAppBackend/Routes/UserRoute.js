import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { authMiddleware, } from "../Middleware/Auth.js";

const secretKey = process.env.SecretKey;
const UserRoute = Router();

// dotenv.config();

UserRoute.post("/Signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log(username, email, password, role);

    const newP = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log("User already exsit!");
      res.status(403).json({ message: "User already exist!" });
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: newP,
        role: role,
      });
      await newUser.save();
      console.log("User successfully registered!");
      res.status(201).json({ message: "User Successfully registered!" });
      console.log(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

UserRoute.post("/Login", async (req, res) => {
  const { userName, password } = req.body;

  console.log(userName, password );

  const result = await User.findOne({ username: userName });
  console.log(result);
  if (!result) {
    res.status(403).json({ message: "user not exist" });
  } else {
    console.log(password);

    const invalid = await bcrypt.compare(password, result.password);

    console.log(invalid);
    if (!invalid) {
      res.status(403).json({ message: "Password is incorect" });
    } else {
      const token = jwt.sign(
        { userName: userName, role: result.role}, secretKey ,
        { expiresIn: "1h" }
      );
      res.cookie("AuthToken", token, {
        httpOnly: true,
      });
      console.log(token);
      res.status(200).json({ token });
      console.log("Login successfull");
    }
  }
});

export { UserRoute };
