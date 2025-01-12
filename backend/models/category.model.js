import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    default: "",
  },
  // categoryId

  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = new mongoose.model("Category", categorySchema);
export default Category;
