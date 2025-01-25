// import express from "express";
// import {
//   editProfile,
//   followOrUnfollow,
//   getProfile,
//   getSuggestedUsers,
//   login,
//   logout,
//   register,
// } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../middlewares/multer.js";

// const router = express.Router();

// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/:id/profile").get(isAuthenticated, getProfile);
// router
//   .route("/profile/edit")
//   .post(isAuthenticated, upload.single("profilePhoto"), editProfile);
// router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
// router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);

// export default router;

import express from "express";
import {
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  verifyEmail, // Import the verifyEmail controller
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePhoto"), editProfile);
router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);

// Add the new verification route
router.route("/verify/:token").get(verifyEmail);

export default router;
