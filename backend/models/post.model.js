// import mongoose from "mongoose";
// const postSchema = new mongoose.Schema({
//   caption: { type: String, default: "" },
//   price: { type: String, default: "" },
//   description: { type: String, default: "" },
//   image: { type: String, required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
//   category: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       default: "",
//     },
//   ],
// });
// export const Post = mongoose.model("Post", postSchema);

import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    caption: { type: String, default: "" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
export const Post = mongoose.model("Post", postSchema);
