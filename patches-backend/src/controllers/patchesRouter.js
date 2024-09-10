import express from "express";
import middleware from "../utils/middleware.js";
import User from "../models/User.js";
import Patch from "../models/Patch.js";
import logger from "../utils/logger.js";

const patchesRouter = express.Router();

patchesRouter
  .route("/")
  .get(async (req, res) => {
    logger.info("Retrieving all patches...");
    const patches = await Patch.find({});
    res.json(patches);
  })

  .post(middleware.userExtractor, async (req, res, next) => {
    try {
      logger.info("Posting new patch...");
      const newPatch = req.body;
      const user = await User.findById(req.user.id);

      const patch = new Patch({
        ...newPatch,
        user: user.id,
      });

      const savedPatch = await patch.save();

      //Add patches ref to User
      user.patches = user.patches.concat(savedPatch.id);
      await user.save();

      res.status(201).json(savedPatch);
    } catch (error) {
      next(error);
    }
  });

patchesRouter
  .route("/:id")
  .get(async (req, res) => {
    res.status(201);
  })
  .delete(middleware.userExtractor, async (request, response) => {
    logger.info("Deleting patch...");
    const returnedPatch = await Patch.findById(request.params.id);
    if (returnedPatch.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ error: "User has no access to delete resource" });
    }

    //delete the patch reference in user
    await User.findByIdAndUpdate(request.user.id, {
      $pull: { patches: request.params.id },
    });

    //delete the blog
    await returnedBlog.deleteOne();
    response.status(204).end();
  });

export default patchesRouter;
