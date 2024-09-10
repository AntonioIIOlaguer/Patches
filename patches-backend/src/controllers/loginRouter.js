import express from "express";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  logger.info(`Logging in ${req.body.username}`);
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // check if user exist and compare pass
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    //check if Wrong username or password
    if (!(user && passwordCorrect)) {
      const error = {
        code: 401,
        name: "Unauthorized User",
        message: "Invalid user or password",
      };
      throw error;
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    //Token creation
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    logger.info(`Login succesful for ${user.username}`);
    res
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
