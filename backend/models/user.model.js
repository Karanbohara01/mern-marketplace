import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/magesDB");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const User = new mongoose.model("User", userSchema);
