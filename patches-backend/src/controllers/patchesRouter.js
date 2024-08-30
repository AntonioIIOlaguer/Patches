import express from "express";
import middleware from "../utils/middleware.js";
import User from "../models/User.js";
import Patch from "../models/Patch.js";
import logger from "../utils/logger.js";

const patchesRouter = express.Router();

patchesRouter
  .route("/")
  .get(async (request, response) => {
    logger.info("Retrieving all patches...");
    const patches = await Patch.find({});
    response.json(patches);
  })

  .post(middleware.userExtractor, async (request, response) => {
    logger.info("Posting new patch...");
    const newPatch = request.body;
    const user = await User.findById(request.user.id);

    const patch = new Patch({
      ...newPatch,
      user: user.id,
    });

    const savedPatch = await Patch.save();
    await patch.populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });

    user.patches = user.patches.concat(savedPatch.id);
    await user.save();

    response.status(201).json(savedPatch);
  });

patchesRouter
  .route("/:id")
  .get(async (request, response) => {
    response.status(201);
  })
  .delete(middleware.userExtractor, async (request, response) => {
    logger.info("Deleting patch...");
    const returnedPatch = await Patch.findById(request.params.id);
    if (returnedPatch.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ error: "User has no access to delete resource" });
    }

    //delete the blog reference in user
    await User.findByIdAndUpdate(request.user.id, {
      $pull: { patches: request.params.id },
    });

    //delete the blog
    await returnedBlog.deleteOne();
    response.status(204).end();
  });

export default patchesRouter;
