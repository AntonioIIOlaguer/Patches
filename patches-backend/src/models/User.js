import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  name: String,
  passwordHash: String,

  patches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patch",
    },
  ],
});

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);
