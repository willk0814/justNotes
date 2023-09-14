const mongoose = require("mongoose"); // import mongoose library

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  { collection: "users" }
);

module.exports = mongoose.model("Users", userSchema);
