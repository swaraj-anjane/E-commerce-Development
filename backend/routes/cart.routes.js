const { addToCart, getUserCart, removeCartItem, updateCartQuantity } = require("../controllers/cart.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const router = require("express").Router();

//end points
router.post("/add",isLoggedIn,addToCart)
router.get("/getAll/userItems",isLoggedIn,getUserCart)

router.delete("/:id", removeCartItem);


router.patch("/update-quantity/:id", updateCartQuantity);



module.exports = router;
