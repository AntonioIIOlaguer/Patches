import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  name: { type: String, required: true },
  passwordHash: String,

  date: { type: Date, default: Date.now },

  patches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patch",
    },
  ],
});

schema.plugin(uniqueValidator);
schema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model("User", schema);
