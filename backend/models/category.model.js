import mongoose from "mongoose";

// Define the Category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true, // Ensure category names are unique
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
