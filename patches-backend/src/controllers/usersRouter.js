import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(async (request, response) => {
    //Find all users
    console.log("Finding user");
    const users = await User.find({});
    response.status(200).json(users);
  })

  .post(async (request, response, next) => {
    //Register User
    try {
      const { username, name, password } = request.body;

      if (password.length < 8) {
        const error = {
          name: "ValidationError",
          message: "Password Too short. Minimum of 8 characters",
        };
        throw error;
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });
      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (error) {
      return next(error);
    }
  });
export default usersRouter;
