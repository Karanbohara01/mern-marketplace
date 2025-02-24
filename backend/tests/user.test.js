import { expect } from "chai";
import mongoose from "mongoose";
import { User } from "../models/user.model.js"; // adjust the import path to your User model

// Use native promises
mongoose.Promise = global.Promise;

describe("User Model Test", function () {
  // Connect to a test database before running any tests
  before(async function () {
    await mongoose.connect("mongodb://localhost:27017/social-app_test_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect after all tests are done
  after(async function () {
    await mongoose.connection.close();
  });

  // Clear the User collection before each test
  beforeEach(async function () {
    await User.deleteMany({});
  });

  it("should create a user with valid fields", async function () {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.username).to.equal(userData.username);
    expect(savedUser.email).to.equal(userData.email);
    // Role defaults to "user"
    expect(savedUser.role).to.equal("user");
    // Optional fields should have default values
    expect(savedUser.profilePicture).to.be.null;
    expect(savedUser.bio).to.equal("");
    expect(savedUser.isVerified).to.be.false;
  });

  it("should not create a user without required fields", async function () {
    // Missing the required "username" field
    const userData = {
      email: "testuser@example.com",
      password: "password123",
    };

    const user = new User(userData);
    try {
      await user.save();
      throw new Error("User without username should not be saved");
    } catch (err) {
      expect(err.errors).to.have.property("username");
    }
  });

  it("should enforce unique username and email", async function () {
    const userData = {
      username: "uniqueuser",
      email: "unique@example.com",
      password: "password123",
    };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    try {
      await user2.save();
      throw new Error("Duplicate user should not be saved");
    } catch (err) {
      expect(err).to.exist;
      // Instead of checking err.code, check the error message for the duplicate key error
      expect(err.message).to.include("E11000");
    }
  });

  it("should validate gender field against enum values", async function () {
    const userData = {
      username: "genderTest",
      email: "genderTest@example.com",
      password: "password123",
      gender: "invalidGender", // not one of the allowed values
    };

    const user = new User(userData);
    try {
      await user.save();
      throw new Error("User with invalid gender should not be saved");
    } catch (err) {
      expect(err.errors).to.have.property("gender");
    }
  });

  it("should have default values for optional fields", async function () {
    const userData = {
      username: "defaultTest",
      email: "defaultTest@example.com",
      password: "password123",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.profilePicture).to.be.null;
    expect(savedUser.bio).to.equal("");
    expect(savedUser.verificationToken).to.be.null;
    expect(savedUser.resetPasswordToken).to.be.null;
  });
});
