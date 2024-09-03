import config from "./utils/config.js";
import express from "express";
const app = express();
import cors from "cors";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import usersRouter from "./controllers/usersRouter.js";
import patchesRouter from "./controllers/patchesRouter.js";
import loginRouter from "./controllers/loginRouter.js";

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

//Connect to DB
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

//Establish routes
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/patches", patchesRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
