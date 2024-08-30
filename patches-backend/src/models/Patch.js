import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fullResUrl: String,
  ThumbnailResUrl: String,
});

export default { Patch: mongoose.model("Patch", schema) };
