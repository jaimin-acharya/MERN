const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

// Admin routes for managing users and contacts
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

// Get user by ID
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

// Update user by ID
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// Delete user by ID
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// Get all contacts
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

// Delete contacts
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;
