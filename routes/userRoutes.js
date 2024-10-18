const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/", authMiddleware, authController.getUsers);
router.put("/:id", authMiddleware, authController.updateUser);
router.delete("/:id", authMiddleware, authController.deleteUser);
router.get("/:id", authMiddleware, authController.getUserById);

module.exports = router;