import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fullResUrl: String,
  thumbnailResUrl: String,
});

export default mongoose.model("Patch", schema);
