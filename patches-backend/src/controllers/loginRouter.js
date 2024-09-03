import express from "express";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response, next) => {
  logger.info(`Logging in ${request.body.username}`);
  try {
    const { username, password } = request.body;

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
    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
