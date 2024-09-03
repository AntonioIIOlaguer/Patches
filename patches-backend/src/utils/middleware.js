import logger from "./logger.js";
import jwt from "jsonwebtoken";

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });

    case "ValidationError":
      return response.status(400).json({ error: error.message });

    default:
      return response.status(error.code).json({ error: error.message });
      next(error);
  }
};

//Gets token and assigns it to request.token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

//Decodes the Token and sets User to request.user
const userExtractor = async (request, response, next) => {
  // Verifying token returns object which token was based on
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  //If the token is missing or it is invalid, the exception _JsonWebTokenError_ is raised.

  //if decodedToken is undefined
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = decodedToken;
  next();
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
