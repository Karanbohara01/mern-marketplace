import express from "express";

import {
  deleteUser,
  editProfile,
  followOrUnfollow,
  forgetPassword,
  getAllUsers,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// router.route("/register").post(register);
router.route("/login").post(login);
router.post("/register", register);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePhoto"), editProfile);

router.get("/all", getAllUsers);

router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePhoto"), editProfile);
router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);
router.delete("/users/:id", deleteUser); // Removed isAdmin middleware
router.post("/forgetPassword", (req, res) => {
  console.log("Forget password route hit");
  forgetPassword(req, res);
});

router.post("/reset-password/:token", (req, res) => {
  console.log("Received reset request with token:", req.params.token);
  resetPassword(req, res);
});

// Add the new verification route
router.route("/verify/:token").get(verifyEmail);

export default router;

// import express from "express";
// import {
//   login,
//   register,
//   uploadImage,
// } from "../controllers/user.controller.js";
// import upload from "../middlewares/upload.js";

// const router = express.Router();

// router.post("/uploadImage", upload, uploadImage);
// router.post("/register", register);
// router.post("/login", login);

// export default router;
