import { expect } from "chai";
import mongoose from "mongoose";
import { Post } from "../models/post.model.js"; // adjust the path as needed

describe("Post Model Test", function () {
  // Connect to a test database before running tests.
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/test_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect after all tests are done.
  after(async function () {
    await mongoose.connection.close();
  });

  // Clear the Post collection before each test.
  beforeEach(async function () {
    await Post.deleteMany({});
  });

  it("should create a post with valid fields", async function () {
    const validPost = {
      caption: "Test Caption",
      price: "100",
      description: "Test description",
      location: "Test location",
      image: "http://example.com/image.jpg",
      author: new mongoose.Types.ObjectId(), // simulate a valid user id
      likes: [new mongoose.Types.ObjectId()],
      comments: [new mongoose.Types.ObjectId()],
      category: [new mongoose.Types.ObjectId()],
    };

    const post = new Post(validPost);
    const savedPost = await post.save();

    // Check that the saved post has an _id and the provided fields.
    expect(savedPost).to.have.property("_id");
    expect(savedPost.caption).to.equal(validPost.caption);
    expect(savedPost.price).to.equal(validPost.price);
    expect(savedPost.description).to.equal(validPost.description);
    expect(savedPost.location).to.equal(validPost.location);
    expect(savedPost.image).to.equal(validPost.image);
    expect(savedPost.author.toString()).to.equal(validPost.author.toString());
    expect(savedPost.likes).to.have.lengthOf(1);
    expect(savedPost.comments).to.have.lengthOf(1);
    expect(savedPost.category).to.have.lengthOf(1);
    // Check that timestamps are added.
    expect(savedPost).to.have.property("createdAt");
    expect(savedPost).to.have.property("updatedAt");
  });

  it("should set default values for optional fields", async function () {
    const postData = {
      image: "http://example.com/image.jpg",
      author: new mongoose.Types.ObjectId(),
    };

    const post = new Post(postData);
    const savedPost = await post.save();

    // Optional string fields should default to empty string.
    expect(savedPost.caption).to.equal("");
    expect(savedPost.price).to.equal("");
    expect(savedPost.description).to.equal("");
    expect(savedPost.location).to.equal("");
    // Arrays should be empty.
    expect(savedPost.likes).to.be.an("array").that.is.empty;
    expect(savedPost.comments).to.be.an("array").that.is.empty;
    expect(savedPost.category).to.be.an("array").that.is.empty;
  });

  it("should require the image field", async function () {
    const postData = {
      author: new mongoose.Types.ObjectId(),
    };

    const post = new Post(postData);
    let err;
    try {
      await post.save();
    } catch (error) {
      err = error;
    }
    expect(err).to.exist;
    expect(err.errors).to.have.property("image");
  });

  it("should require the author field", async function () {
    const postData = {
      image: "http://example.com/image.jpg",
    };

    const post = new Post(postData);
    let err;
    try {
      await post.save();
    } catch (error) {
      err = error;
    }
    expect(err).to.exist;
    expect(err.errors).to.have.property("author");
  });
});
