const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, productController.getProducts);
router.post("/", authMiddleware, productController.createProduct);
router.get("/:id", authMiddleware, productController.getProducts);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;