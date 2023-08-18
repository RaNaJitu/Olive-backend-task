// app/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validateTokenHandler");
const Controller = require("../controllers");

// =====  Start Credential Routes ======
router.post("/login", Controller.loginController.login);
router.post("/SignUp", Controller.userController.createUser);
// ==== End Credential Routes =====

// ===== Start User the routes =====
router.get("/user", validateToken, Controller.userController.getAllUsers);
router.get("/user/:id", Controller.userController.getUserById);
router.delete("/user/:id", validateToken, Controller.userController.deleteUser);
// ===== End User the routes =====

// ===== Start University the routes =====
router.get(
  "/university",
  validateToken,
  Controller.universityController.getAllUniversity
);
// ===== End University the routes =====

// ===== Start Wishlist the routes =====
router.patch(
  "/wishlist",
  //   validateToken,
  Controller.universityController.updateWishlist
);
// ===== End Wishlist the routes =====

module.exports = router;
