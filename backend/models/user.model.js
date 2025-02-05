// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     role: {
//       type: String,
//       enum: ["user", "admin"], // <-- Correct enum definition
//       default: "user", // <-- Good practice: provide a default value
//     },
//     password: { type: String, required: true },
//     profilePicture: {
//       type: String,
//       default: null,
//     },
//     bio: { type: String, default: "" },
//     gender: { type: String, enum: ["male", "female", "others"] },
//     followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
//     bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
//     isVerified: { type: Boolean, default: false },
//     verificationToken: { type: String, default: null },
//   },
//   { timestamps: true }
// );
// export const User = mongoose.model("User", userSchema);

// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   image: {
//     type: String,
//     default: null,
//   },
//   email: { type: String, required: true, unique: true },
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// // Encrypt password using bcrypt
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Sign JWT and return
// userSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// // Match user entered password to hashed password in database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Generate and hash password token
// userSchema.methods.getResetPasswordToken = function () {
//   // Generate token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash token and set to resetPasswordToken field
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Set expire
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

// // Export the model using ES6 export syntax
// export default mongoose.model("User", userSchema);

// **************************************************************//
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default: null,
    },
    bio: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "others"] },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },

    // Add fields for password reset functionality
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
