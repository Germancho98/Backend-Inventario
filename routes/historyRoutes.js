const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, historyController.getHistory);
router.get("/:id", authMiddleware, historyController.getHistoryById);
router.post("/", authMiddleware, historyController.createHistory);
router.put("/:id", authMiddleware, historyController.updateHistory);
router.delete("/:id", authMiddleware, historyController.deleteHistory);

module.exports = router;