// import { Comment } from "../models/comment.model.js";

// import fs from "fs";
// import path from "path";
// import sharp from "sharp";
// import { Post } from "../models/post.model.js";
// import { User } from "../models/user.model.js";

// export const addNewPost = async (req, res) => {
//   try {
//     const { caption, description, location, price, category } = req.body;
//     const image = req.file;
//     const authorId = req.id;

//     // Validate required fields
//     if (!image) {
//       return res
//         .status(400)
//         .json({ message: "Image required", success: false });
//     }

//     if (!caption || !price || !description || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Define upload path
//     const uploadPath = path.join("public/uploads");

//     // Ensure the upload directory exists
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     // Generate image name in the required format
//     const timestamp = Date.now(); // Get current timestamp
//     const filename = `IMG-${timestamp}.jpg`; // Example: IMG-1739782422775.jpg
//     const filePath = path.join(uploadPath, filename);

//     // Optimize and save image locally
//     await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toFile(filePath);

//     // Save only the filename in the database, not the full path
//     const post = await Post.create({
//       caption,
//       price,
//       description,
//       location,
//       category: Array.isArray(category) ? category : [category], // Ensure category is an array
//       image: filename, // Store only the filename, not the full path
//       author: authorId,
//     });

//     // Add post to user's posts
//     const user = await User.findById(authorId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }
//     user.posts.push(post._id);
//     await user.save();

//     // Populate author and category fields
//     await post.populate([
//       { path: "author", select: "-password" },
//       { path: "category" },
//     ]);

//     return res.status(201).json({
//       message: "New post added",
//       post,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };

// //   try {
// //     const posts = await Post.find()
// //       .sort({ createdAt: 1 })
// //       .populate({ path: "author", select: "username profilePicture" })
// //       .populate({
// //         path: "comments",
// //         sort: { createdAt: 1 },
// //         populate: {
// //           path: "author",
// //           select: "username profilePicture",
// //         },
// //       })
// //       .populate({
// //         path: "category",
// //       });
// //     return res.status(200).json({
// //       posts,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// // export const getUserPost = async (req, res) => {
// //   try {
// //     const authorId = req.id;
// //     const posts = await Post.find({ author: authorId })
// //       .sort({ createdAt: 1 })
// //       .populate({
// //         path: "author",
// //         select: "username, profilePicture",
// //       })
// //       .populate({
// //         path: "comments",
// //         sort: { createdAt: 1 },
// //         populate: {
// //           path: "author",
// //           select: "username, profilePicture",
// //         },
// //       });
// //     return res.status(200).json({
// //       posts,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// export const getAllPost = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .sort({ createdAt: 1 })
//       .populate({ path: "author", select: "username profilePicture" })
//       .populate({
//         path: "comments",
//         sort: { createdAt: 1 },
//         populate: {
//           path: "author",
//           select: "username profilePicture",
//         },
//       })
//       .populate({ path: "category" });

//     // Convert filename to full image URL
//     const formattedPosts = posts.map((post) => ({
//       ...post._doc,
//       image: `${req.protocol}://${req.get("host")}/uploads/${post.image}`, // Convert filename to full URL
//     }));

//     return res.status(200).json({
//       posts: formattedPosts,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };

// export const getUserPost = async (req, res) => {
//   try {
//     const authorId = req.id;
//     const posts = await Post.find({ author: authorId })
//       .sort({ createdAt: 1 })
//       .populate({
//         path: "author",
//         select: "username profilePicture",
//       })
//       .populate({
//         path: "comments",
//         sort: { createdAt: 1 },
//         populate: {
//           path: "author",
//           select: "username profilePicture",
//         },
//       });

//     // Convert filename to full image URL
//     const formattedPosts = posts.map((post) => ({
//       ...post._doc,
//       image: `${req.protocol}://${req.get("host")}/uploads/${post.image}`, // Convert filename to full URL
//     }));

//     return res.status(200).json({
//       posts: formattedPosts,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };

// export const likePost = async (req, res) => {
//   try {
//     const likeKrneWalaUserKiId = req.id;
//     const postId = req.params.id;
//     const post = await Post.findById(postId);
//     if (!post)
//       return res
//         .status(404)
//         .json({ message: "Post not found", success: false });

//     // like logic started
//     await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
//     await post.save();

//     // implement socket io for real time notification
//     const user = await User.findById(likeKrneWalaUserKiId).select(
//       "username profilePicture"
//     );

//     const postOwnerId = post.author.toString();
//     if (postOwnerId !== likeKrneWalaUserKiId) {
//       // emit a notification event
//       const notification = {
//         type: "like",
//         userId: likeKrneWalaUserKiId,
//         userDetails: user,
//         postId,
//         message: "Your post was liked",
//       };
//       const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//       io.to(postOwnerSocketId).emit("notification", notification);
//     }

//     return res.status(200).json({ message: "Post liked", success: true });
//   } catch (error) {}
// };
// export const dislikePost = async (req, res) => {
//   try {
//     const likeKrneWalaUserKiId = req.id;
//     const postId = req.params.id;
//     const post = await Post.findById(postId);
//     if (!post)
//       return res
//         .status(404)
//         .json({ message: "Post not found", success: false });

//     // like logic started
//     await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
//     await post.save();

//     // implement socket io for real time notification
//     const user = await User.findById(likeKrneWalaUserKiId).select(
//       "username profilePicture"
//     );
//     const postOwnerId = post.author.toString();
//     if (postOwnerId !== likeKrneWalaUserKiId) {
//       // emit a notification event
//       const notification = {
//         type: "dislike",
//         userId: likeKrneWalaUserKiId,
//         userDetails: user,
//         postId,
//         message: "Your post was liked",
//       };
//       const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//       io.to(postOwnerSocketId).emit("notification", notification);
//     }

//     return res.status(200).json({ message: "Post disliked", success: true });
//   } catch (error) {}
// };
// export const addComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const commentKrneWalaUserKiId = req.id;

//     const { text } = req.body;

//     const post = await Post.findById(postId);

//     if (!text)
//       return res
//         .status(400)
//         .json({ message: "text is required", success: false });

//     const comment = await Comment.create({
//       text,
//       author: commentKrneWalaUserKiId,
//       post: postId,
//     });

//     await comment.populate({
//       path: "author",
//       select: "username profilePicture",
//     });

//     post.comments.push(comment._id);
//     await post.save();

//     return res.status(201).json({
//       message: "Comment Added",
//       comment,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const comments = await Comment.find({ post: postId }).populate(
//       "author",
//       "username profilePicture"
//     );

//     if (!comments)
//       return res
//         .status(404)
//         .json({ message: "No comments found for this post", success: false });

//     return res.status(200).json({ success: true, comments });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;

//     const post = await Post.findById(postId);
//     if (!post)
//       return res
//         .status(404)
//         .json({ message: "Post not found", success: false });

//     // check if the logged-in user is the owner of the post
//     // if (post.author.toString() !== authorId)
//     //   return res.status(403).json({ message: "Unauthorized" });

//     // delete post
//     await Post.findByIdAndDelete(postId);

//     // remove the post id from the user's post
//     let user = await User.findById(authorId);
//     user.posts = user.posts.filter((id) => id.toString() !== postId);
//     await user.save();

//     // delete associated comments
//     await Comment.deleteMany({ post: postId });

//     return res.status(200).json({
//       success: true,
//       message: "Post deleted",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const bookmarkPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;
//     const post = await Post.findById(postId);
//     if (!post)
//       return res
//         .status(404)
//         .json({ message: "Post not found", success: false });

//     const user = await User.findById(authorId);
//     if (user.bookmarks.includes(post._id)) {
//       // already bookmarked -> remove from the bookmark
//       await user.updateOne({ $pull: { bookmarks: post._id } });
//       await user.save();
//       return res.status(200).json({
//         type: "unsaved",
//         message: "Post removed from bookmark",
//         success: true,
//       });
//     } else {
//       // bookmark krna pdega
//       await user.updateOne({ $addToSet: { bookmarks: post._id } });
//       await user.save();
//       return res
//         .status(200)
//         .json({ type: "saved", message: "Post bookmarked", success: true });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;
//     const { caption, description, location, price } = req.body;
//     const image = req.file;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res
//         .status(404)
//         .json({ message: "Post not found", success: false });
//     }

//     if (post.author.toString() !== authorId) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized: You are not the owner of this post" });
//     }

//     // Prepare the update object
//     const updateData = {
//       caption,
//       description,
//       location,
//       price,
//     };
//     // Optimize and upload image only if it's present
//     if (image) {
//       const optimizedImageBuffer = await sharp(image.buffer)
//         .resize({ width: 800, height: 800, fit: "inside" })
//         .toFormat("jpeg", { quality: 80 })
//         .toBuffer();

//       const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//         "base64"
//       )}`;
//       const cloudResponse = await cloudinary.uploader.upload(fileUri);
//       updateData.image = cloudResponse.secure_url;
//     }

//     // Perform the update
//     const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     // Populate author and category fields
//     await updatedPost.populate([
//       { path: "author", select: "-password" },
//       { path: "category" },
//     ]);

//     return res.status(200).json({
//       message: "Post updated successfully",
//       post: updatedPost,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error updating post:", error);

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
//     return res.status(500).json({ message, success: false });
//   }
// };

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
// Import cloudinary if used in updatePost (assumed configured elsewhere)
import cloudinary from "cloudinary";

// ---------------------------------------------------------------------
// Add New Post
// ---------------------------------------------------------------------
export const addNewPost = async (req, res) => {
  try {
    const { caption, description, location, price, category } = req.body;
    const image = req.file;
    const authorId = req.id;

    // Validate required fields
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image required", success: false });
    }
    if (!caption || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Define upload path and ensure it exists
    const uploadPath = path.join("public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Generate image name and optimize & save image locally
    const timestamp = Date.now();
    const filename = `IMG-${timestamp}.jpg`;
    const filePath = path.join(uploadPath, filename);
    await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toFile(filePath);

    // Create the post – ensure category is an array
    const post = await Post.create({
      caption,
      price,
      description,
      location,
      category: Array.isArray(category) ? category : [category],
      image: filename, // store only filename
      author: authorId,
    });

    // Add post ID to the user and save
    const user = await User.findById(authorId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.posts.push(post._id);
    await user.save();

    // Populate author and category fields
    await post.populate([
      { path: "author", select: "-password" },
      { path: "category" },
    ]);

    return res.status(201).json({
      message: "New post added",
      post,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Get All Posts – Read and format image URLs
// ---------------------------------------------------------------------
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: 1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: 1 },
        populate: { path: "author", select: "username profilePicture" },
      })
      .populate({ path: "category" });

    const formattedPosts = posts.map((post) => ({
      ...post._doc,
      image: `${req.protocol}://${req.get("host")}/uploads/${post.image}`,
    }));

    return res.status(200).json({
      posts: formattedPosts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Get Posts for a Specific User – Read and format image URLs
// ---------------------------------------------------------------------
export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: 1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: 1 },
        populate: { path: "author", select: "username profilePicture" },
      });

    const formattedPosts = posts.map((post) => ({
      ...post._doc,
      image: `${req.protocol}://${req.get("host")}/uploads/${post.image}`,
    }));

    return res.status(200).json({
      posts: formattedPosts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Like Post – Add user ID to likes and emit notification
// ---------------------------------------------------------------------
export const likePost = async (req, res) => {
  try {
    const likeUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // Update likes
    await post.updateOne({ $addToSet: { likes: likeUserId } });
    await post.save();

    // Send real-time notification if liker is not the post owner
    const user = await User.findById(likeUserId).select(
      "username profilePicture"
    );
    const postOwnerId = post.author.toString();
    if (postOwnerId !== likeUserId) {
      const notification = {
        type: "like",
        userId: likeUserId,
        userDetails: user,
        postId,
        message: "Your post was liked",
      };
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", notification);
      }
    }
    return res.status(200).json({ message: "Post liked", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Dislike Post – Remove user ID from likes and emit notification
// ---------------------------------------------------------------------
export const dislikePost = async (req, res) => {
  try {
    const likeUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    await post.updateOne({ $pull: { likes: likeUserId } });
    await post.save();

    const user = await User.findById(likeUserId).select(
      "username profilePicture"
    );
    const postOwnerId = post.author.toString();
    if (postOwnerId !== likeUserId) {
      const notification = {
        type: "dislike",
        userId: likeUserId,
        userDetails: user,
        postId,
        message: "Your post was disliked",
      };
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", notification);
      }
    }
    return res.status(200).json({ message: "Post disliked", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Add Comment – Create comment, add it to the post, and return the new comment
// ---------------------------------------------------------------------
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentUserId = req.id;
    const { text } = req.body;

    if (!text)
      return res
        .status(400)
        .json({ message: "Text is required", success: false });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const comment = await Comment.create({
      text,
      author: commentUserId,
      post: postId,
    });
    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: "Comment added",
      comment,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Get Comments of a Post – Retrieve all comments for a given post
// ---------------------------------------------------------------------
export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );

    if (!comments || comments.length === 0)
      return res
        .status(404)
        .json({ message: "No comments found for this post", success: false });

    return res.status(200).json({ comments, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Delete Post – Remove a post, its comments, and update the user document
// ---------------------------------------------------------------------
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // Optionally, check ownership before deleting
    // if (post.author.toString() !== authorId) {
    //   return res.status(403).json({ message: "Unauthorized", success: false });
    // }

    await Post.findByIdAndDelete(postId);

    // Remove the post ID from the user's posts
    const user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    // Delete associated comments
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({ message: "Post deleted", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Bookmark Post – Toggle bookmark status for a post in the user document
// ---------------------------------------------------------------------
export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const user = await User.findById(userId);
    if (user.bookmarks.includes(post._id)) {
      // Remove bookmark
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "unsaved",
        message: "Post removed from bookmarks",
        success: true,
      });
    } else {
      // Add bookmark
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "saved",
        message: "Post bookmarked",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// ---------------------------------------------------------------------
// Update Post – Update post details and optionally the image
// ---------------------------------------------------------------------
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const { caption, description, location, price } = req.body;
    const image = req.file;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    if (post.author.toString() !== authorId) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You are not the owner of this post",
          success: false,
        });
    }

    const updateData = { caption, description, location, price };
    if (image) {
      // Optimize and upload new image using sharp and Cloudinary
      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      updateData.image = cloudResponse.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });

    await updatedPost.populate([
      { path: "author", select: "-password" },
      { path: "category" },
    ]);

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
      success: true,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    let message = "Internal server error";
    if (error.name === "ValidationError") {
      message = "Invalid Input Data";
      return res
        .status(400)
        .json({ message, success: false, errors: error.errors });
    } else if (error.name === "CastError") {
      message = "Invalid ID";
      return res
        .status(400)
        .json({ message, success: false, errors: error.message });
    }
    return res.status(500).json({ message, success: false });
  }
};
