import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: { type: Date, default: Date.now },

  fullResUrl: String,
  thumbnailResUrl: String,
});

export default mongoose.model("Patch", schema);
