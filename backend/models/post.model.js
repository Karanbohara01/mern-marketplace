import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    required: true,
    type: String,
    default: "",
  },
  price: {
    type: String,
    requred: true,
    default: "",
  },
  category: {
    ref: "Category",
  },
  status: {
    type: bool,
    default: true,
  },
});

const Post = new mongoose.Model("Post", postSchema);
