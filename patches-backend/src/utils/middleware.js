import morgan from "morgan";
import logger from "./logger.js";
import jwt from "jsonwebtoken";

//Capture the req Body
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

const requestLogger = morgan(
  ":method :url :status :response-time ms - :res[content-length] :body",
  { skip: (req, res) => process.env.NODE_ENV == "test" },
);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  switch (error.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });

    case "ValidationError":
      return res.status(400).json({ error: error.message });

    default:
      return res.status(error.code).json({ error: error.message });
  }
};

//Gets token and assigns it to request.token
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  //Decodes the Token and sets User to request.user
  try {
    // Verifying token returns object which token was based on
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    //if decodedToken is undefined
    if (!decodedToken.id) {
      const error = {
        code: 401,
        name: "Unauthorized User",
        message: "Invalid User or passsword",
      };
      throw error;
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
