const {
  generateOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const {isLoggedIn} = require("../middleware/auth.middleware")
const router = require("express").Router();


router.post("/generate", isLoggedIn, generateOrder);
router.get("/myorders",isLoggedIn,getOrdersByUserId);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

module.exports = router;