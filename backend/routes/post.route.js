// import express from "express";
// import {
//   addComment,
//   addNewPost,
//   bookmarkPost,
//   deletePost,
//   dislikePost,
//   getAllPost,
//   getCommentsOfPost,
//   getUserPost,
//   likePost,
//   updatePost,
// } from "../controllers/post.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../middlewares/multer.js";

// const router = express.Router();

// router
//   .route("/addpost")
//   .post(isAuthenticated, upload.single("image"), addNewPost);
// router.route("/all").get(getAllPost);
// router.route("/userpost/all").get(getUserPost);
// router.route("/:id/like").get(isAuthenticated, likePost);
// router.route("/:id").put(isAuthenticated, updatePost);
// router.route("/:id/dislike").get(isAuthenticated, dislikePost);
// router.route("/:id/comment").post(isAuthenticated, addComment);
// router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
// router.route("/delete/:id").delete(isAuthenticated, deletePost);
// router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

// export default router;

import express from "express";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getCommentsOfPost,
  getUserPost,
  likePost,
} from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/addpost")
  .post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

export default router;
