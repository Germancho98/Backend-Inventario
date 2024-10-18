const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/inventory', authMiddleware, reportController.getInventoryReport);
router.get('/movements', authMiddleware, reportController.getMovementReport);

module.exports = router;