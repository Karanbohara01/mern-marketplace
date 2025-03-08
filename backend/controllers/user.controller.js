import bcrypt from "bcryptjs"; // Bcrypt for password hashing
import crypto from "crypto"; // Crypto for generating verification token
import jwt from "jsonwebtoken"; // JWT for creating tokens (if needed later)
import nodemailer from "nodemailer"; // Nodemailer for email sending
import path from "path"; // Path to work with file paths
import { Post } from "../models/post.model.js"; // Post model (if needed in the future)
import { User } from "../models/user.model.js"; // User model for registration
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

import { fileURLToPath } from "url"; // For working with file paths in ES modules

// Get current file directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the multer upload middleware
import upload from "../middlewares/multer.js";

// Send verification email function
const sendVerificationEmail = async (user, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const verificationLink = `${process.env.URL}/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.MAILTRAP_USER,
    to: user.email,
    subject: "Verify Your Email",
    html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Try a different email",
        success: false,
      });
    }

    // Handle Profile Picture Upload
    let profilePictureUrl = "";

    // Use multer middleware to upload the file
    await new Promise((resolve, reject) => {
      upload.single("profilePicture")(req, res, (err) => {
        if (err) {
          console.error("Error uploading profile picture:", err);
          return reject(err);
        }
        resolve();
      });
    });

    // If file uploaded successfully, set the profile picture URL
    if (req.file) {
      profilePictureUrl = path.join("/uploads", req.file.filename); // Store only the URL
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    console.log("Generated verification token:", verificationToken); // Log the generated token

    // Create the new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      profilePicture: profilePictureUrl,
    });

    // Send verification email to the user
    try {
      await sendVerificationEmail(newUser, verificationToken);
    } catch (error) {
      console.error("Error sending verification email:", error);
      return res.status(500).json({
        message: "Email sending failed",
        success: false,
        error: error.message,
      });
    }

    // Respond with success message
    return res.status(201).json({
      message: "Account created successfully. Please verify your email.",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Registration failed",
      success: false,
      error: error.message,
    });
  }
};

export const uploadImage = async (req, res, next) => {
  // // check for the file size and send an error message
  // if (req.file.size > process.env.MAX_FILE_UPLOAD) {
  //   return res.status(400).send({
  //     message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
  //   });
  // }

  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
  res.status(200).json({
    success: true,
    data: req.file.filename,
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Email is not verified yet. Please verify your email address.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // populate each post if in the posts array
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      role: user.role, // Make sure this is part of the response
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     let user = await User.findById(userId)
//       .populate({ path: "posts", createdAt: -1 })
//       .populate("bookmarks");
//     return res.status(200).json({
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      // Populate the user's own posts
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 } }, // Sort by createdAt descending
        populate: [
          {
            path: "author",
            select: "username profilePicture",
          },
          {
            path: "comments",
            populate: {
              path: "author",
              select: "username profilePicture",
            },
          },
        ],
      })
      // Populate the user's bookmarked posts
      .populate({
        path: "bookmarks",
        populate: [
          {
            path: "author",
            select: "username profilePicture",
          },
          {
            path: "comments",
            populate: {
              path: "author",
              select: "username profilePicture",
            },
          },
        ],
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender, username, role } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (bio) user.username = username;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "Currently do not have any users",
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKrneWala = req.id; // patel
    const jiskoFollowKrunga = req.params.id; // shivani
    if (followKrneWala === jiskoFollowKrunga) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(followKrneWala);
    const targetUser = await User.findById(jiskoFollowKrunga);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    // mai check krunga ki follow krna hai ya unfollow
    const isFollowing = user.following.includes(jiskoFollowKrunga);
    if (isFollowing) {
      // unfollow logic ayega
      await Promise.all([
        User.updateOne(
          { _id: followKrneWala },
          { $pull: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $pull: { followers: followKrneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "Unfollowed successfully", success: true });
    } else {
      // follow logic ayega
      await Promise.all([
        User.updateOne(
          { _id: followKrneWala },
          { $push: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $push: { followers: followKrneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "followed successfully", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log("Received verification token:", token); // Log the received token

  try {
    // Find the user with the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid verification token", success: false });
    }

    // Mark the user as verified
    user.isVerified = true;
    //user.verificationToken = null; // Clear token after successful verification
    await user.save();

    return res
      .status(200)
      .json({ message: "Email verified successfully.", success: true });
  } catch (error) {
    console.error("Error during verification:", error);
    return res
      .status(500)
      .json({ message: "Verification failed", success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users excluding their passwords
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the userId from the request parameters

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Optional: If you want to delete posts and related data
    await Post.deleteMany({ author: userId }); // Deletes posts by this user (if any)

    // Optional: Remove user from followers and following lists in other users
    await Promise.all([
      User.updateMany({ following: userId }, { $pull: { following: userId } }), // Remove user from others' following
      User.updateMany({ followers: userId }, { $pull: { followers: userId } }), // Remove user from others' followers
    ]);

    // Delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "Error deleting user.",
      success: false,
      error: error.message,
    });
  }
};

// forgot password

// export const forgetPassword = async (req, res) => {
//   try {
//     console.log(`Password reset request received for email: ${req.body.email}`);

//     // Find user by email
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       console.log(`User not found with email: ${req.body.email}`);
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "10m",
//     });

//     // Configure nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAILTRAP_HOST,
//       port: process.env.MAILTRAP_PORT,
//       auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASS,
//       },
//     });

//     // Use frontend URL from `.env`
//     const resetUrl = `${process.env.URL}/reset-password/${token}`;
//     const mailOptions = {
//       from: process.env.MAILTRAP_USER,
//       to: req.body.email,
//       subject: "Reset Password",
//       html: `
//         <h1>Reset Your Password</h1>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetUrl}">${resetUrl}</a>
//         <p>The link will expire in 10 minutes.</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Password reset email sent to ${req.body.email}`);
//     res.status(200).send({ message: "Email sent" });
//   } catch (err) {
//     console.error("Error in forgetPassword:", err.message);
//     res.status(500).send({ message: "Internal server error" });
//   }
// };

// forget password

// forget password
export const forgetPassword = async (req, res) => {
  try {
    console.log(`Password reset request received for email: ${req.body.email}`);

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log(`User not found with email: ${req.body.email}`);
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex"); // Generates a 32-byte (64 hex character) token

    // Hash the reset token
    const salt = await bcrypt.genSalt(10);
    const hashedResetToken = await bcrypt.hash(resetToken, salt);

    // Set reset token and expiry on user document
    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes expiration (in milliseconds)
    await user.save();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Use frontend URL from `.env`
    const resetUrl = `${process.env.URL}/reset-password/${resetToken}`; // Send the *unhashed* token in the URL
    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: req.body.email,
      subject: "Password Reset",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${req.body.email}`);
      res
        .status(200)
        .send({ message: "Password reset email sent successfully" });
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      res.status(500).send({ message: "Failed to send password reset email" });
    }
  } catch (err) {
    console.error("Error in forgetPassword:", err); // Log the full error object
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Extract token from URL
    const { newPassword } = req.body; // Extract new password from request body

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken: { $exists: true },
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Compare provided token with hashed token
    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Check if password is strong enough
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain a number and a special character.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear token fields
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password", error: error.message });
  }
};
