const router = require("express").Router();
const  { createCheckoutSession } = require ("../controllers/payment.controller");
const { isLoggedIn } = require ("../middleware/auth.middleware");



router.post("/create-checkout-session", isLoggedIn, createCheckoutSession);

module.exports = router;