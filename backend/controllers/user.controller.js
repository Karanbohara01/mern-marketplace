// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { Post } from "../models/post.model.js";
// import { User } from "../models/user.model.js";
// import cloudinary from "../utils/cloudinary.js";
// import getDataUri from "../utils/datauri.js";
// export const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(401).json({
//         message: "Something is missing, please check!",
//         success: false,
//       });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(401).json({
//         message: "Try different email",
//         success: false,
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     return res.status(201).json({
//       message: "Account created successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Something is missing, please check!",
//         success: false,
//       });
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     // populate each post if in the posts array
//     const populatedPosts = await Promise.all(
//       user.posts.map(async (postId) => {
//         const post = await Post.findById(postId);
//         if (post.author.equals(user._id)) {
//           return post;
//         }
//         return null;
//       })
//     );
//     user = {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       profilePicture: user.profilePicture,
//       bio: user.bio,
//       followers: user.followers,
//       following: user.following,
//       posts: populatedPosts,
//     };
//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         message: `Welcome back ${user.username}`,
//         success: true,
//         user,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const logout = async (_, res) => {
//   try {
//     return res.cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
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

// export const editProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { bio, gender, username } = req.body;
//     const profilePicture = req.file;
//     let cloudResponse;

//     // Check if the user exists or not
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found.",
//         success: false,
//       });
//     }
//     // Check if the username is available or not
//     if (username && username !== user.username) {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ message: "Username already taken", success: false });
//       }
//     }
//     // upload image if exists
//     if (profilePicture) {
//       const fileUri = getDataUri(profilePicture);
//       cloudResponse = await cloudinary.uploader.upload(fileUri);
//     }

//     // Update user fields only if they are present
//     if (bio) user.bio = bio;
//     if (username) user.username = username;
//     if (gender) user.gender = gender;
//     if (profilePicture) user.profilePicture = cloudResponse.secure_url;

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated.",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     let message = "Internal server error";
//     if (error.name === "ValidationError") {
//       message = "Invalid Input Data";
//       return res.status(400).json({
//         message,
//         success: false,
//         errors: error.errors,
//       });
//     } else if (error.name === "CastError") {
//       message = "Invalid ID";
//       return res.status(400).json({
//         message,
//         success: false,
//         errors: error.message,
//       });
//     }
//     return res.status(500).json({
//       message,
//       success: false,
//       errors: error,
//     });
//   }
// };
// export const getSuggestedUsers = async (req, res) => {
//   try {
//     const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
//       "-password"
//     );
//     if (!suggestedUsers) {
//       return res.status(400).json({
//         message: "Currently do not have any users",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       users: suggestedUsers,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const followOrUnfollow = async (req, res) => {
//   try {
//     const followKrneWala = req.id; // patel
//     const jiskoFollowKrunga = req.params.id; // shivani
//     if (followKrneWala === jiskoFollowKrunga) {
//       return res.status(400).json({
//         message: "You cannot follow/unfollow yourself",
//         success: false,
//       });
//     }

//     const user = await User.findById(followKrneWala);
//     const targetUser = await User.findById(jiskoFollowKrunga);

//     if (!user || !targetUser) {
//       return res.status(400).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//     // mai check krunga ki follow krna hai ya unfollow
//     const isFollowing = user.following.includes(jiskoFollowKrunga);
//     if (isFollowing) {
//       // unfollow logic ayega
//       await Promise.all([
//         User.updateOne(
//           { _id: followKrneWala },
//           { $pull: { following: jiskoFollowKrunga } }
//         ),
//         User.updateOne(
//           { _id: jiskoFollowKrunga },
//           { $pull: { followers: followKrneWala } }
//         ),
//       ]);
//       return res
//         .status(200)
//         .json({ message: "Unfollowed successfully", success: true });
//     } else {
//       // follow logic ayega
//       await Promise.all([
//         User.updateOne(
//           { _id: followKrneWala },
//           { $push: { following: jiskoFollowKrunga } }
//         ),
//         User.updateOne(
//           { _id: jiskoFollowKrunga },
//           { $push: { followers: followKrneWala } }
//         ),
//       ]);
//       return res
//         .status(200)
//         .json({ message: "followed successfully", success: true });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Function to send verification email
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
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a unique verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    console.log("Generated verification token:", verificationToken); // Log the generated token
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });
    // Send verification email
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

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Something is missing, please check!",
//         success: false,
//       });
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     // populate each post if in the posts array
//     const populatedPosts = await Promise.all(
//       user.posts.map(async (postId) => {
//         const post = await Post.findById(postId);
//         if (post.author.equals(user._id)) {
//           return post;
//         }
//         return null;
//       })
//     );
//     user = {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       profilePicture: user.profilePicture,
//       bio: user.bio,
//       followers: user.followers,
//       following: user.following,
//       posts: populatedPosts,
//     };
//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         message: `Welcome back ${user.username}`,
//         success: true,
//         user,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

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

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender, username } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    // Check if the user exists or not
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    // Check if the username is available or not
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username already taken", success: false });
      }
    }
    // upload image if exists
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    // Update user fields only if they are present
    if (bio) user.bio = bio;
    if (username) user.username = username;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    let message = "Internal server error";
    if (error.name === "ValidationError") {
      message = "Invalid Input Data";
      return res.status(400).json({
        message,
        success: false,
        errors: error.errors,
      });
    } else if (error.name === "CastError") {
      message = "Invalid ID";
      return res.status(400).json({
        message,
        success: false,
        errors: error.message,
      });
    }
    return res.status(500).json({
      message,
      success: false,
      errors: error,
    });
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
