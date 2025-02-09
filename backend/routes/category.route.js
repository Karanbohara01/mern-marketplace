import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();
// Routes
router.post("/", createCategory); // Create a new category
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get category by ID
router.put("/:id", updateCategory); // Update category by ID
router.delete("/:id", deleteCategory); // Delete category by ID
export default router;
