import { expect } from "chai";
import mongoose from "mongoose";
import Category from "../models/category.model.js"; // adjust the path as needed

describe("Category Model Test", function () {
  // Connect to a test database before running any tests
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/test_database", {
      useNewUrlParser: true, // deprecated options may show warnings
      useUnifiedTopology: true,
    });
  });

  // Disconnect after all tests are done
  after(async function () {
    await mongoose.connection.close();
  });

  // Clear the Category collection before each test
  beforeEach(async function () {
    await Category.deleteMany({});
  });

  it("should create a category with valid fields", async function () {
    const categoryData = {
      name: "Electronics",
    };

    const category = new Category(categoryData);
    const savedCategory = await category.save();

    expect(savedCategory.name).to.equal(categoryData.name);
    // Timestamps should be automatically added
    expect(savedCategory).to.have.property("createdAt");
    expect(savedCategory).to.have.property("updatedAt");
  });

  it("should not create a category without required names", async function () {
    const categoryData = {}; // Missing the required "name" field

    const category = new Category(categoryData);
    try {
      await category.save();
      throw new Error("Category without a name should not be saved");
    } catch (err) {
      expect(err.errors).to.have.property("name");
    }
  });

  it("should enforce unique category name", async function () {
    const categoryData = { name: "Books" };

    const category1 = new Category(categoryData);
    await category1.save();

    const category2 = new Category(categoryData);
    try {
      await category2.save();
      throw new Error("Duplicate category should not be saved");
    } catch (err) {
      // Now that the index is built, saving a duplicate should trigger a MongoDB error with a message containing "E11000"
      expect(err.message).to.include("E11000");
    }
  });
});
