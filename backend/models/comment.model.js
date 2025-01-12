import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: String,
    required: true,
    default: "",
  },
  timeStamps,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
