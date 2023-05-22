import mongoose from "mongoose";

//Schema
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Model
export const Task= mongoose.model("Task", Schema);
 