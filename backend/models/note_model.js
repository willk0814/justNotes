const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "notes" });

module.exports = mongoose.model("Note", noteSchema);
