const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed:{
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", todoSchema);
