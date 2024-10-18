const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, movementController.getMovements);
router.post("/", authMiddleware, movementController.createMovement);
router.get("/:id", authMiddleware, movementController.getMovements);

module.exports = router;