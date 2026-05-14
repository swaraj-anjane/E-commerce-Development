const cartModel = require("../model/cart.model");
const CartModel = require("../model/cart.model");
/**
 *
 * @body {product:ObjectId,user:ObjectId,quantity:Number} req
 */
async function addToCart(req, res) {
  try {
    //check if already exist
    const isExist = await CartModel.findOne({
      user: req.userId,
      product: req.body.product,
    });

    if (isExist) {
      isExist.quantity += 1;
      await isExist.save();
      res.status(201).json({ message: `product added to cart`, data: isExist });
      return;
    }

    const cart = await CartModel.create({ ...req.body, user: req.userId });
    res.status(201).json({ message: `product added to cart`, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getUserCart(req, res) {
  try {
    const cart = await CartModel.find({ user: req.userId })
      .populate("product", "poster name price mrp discount")
      .populate("user", "name email");
    if (cart.length < 1) {
      return res
        .status(404)
        .json({ message: "not items found . please add items to cart",data:[] });
    }
    res.status(200).json({ message: `cart fetched`, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// delete or remove cart item
// required payload : cartId


async function removeCartItem(req, res) {
  const {id} = req.params
  console.log(req.params.id);
  try {
    const remove = await cartModel.findByIdAndDelete(id)
    res.status(200).json({massage: "item remove done",data:remove})
    ;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateCartQuantity(req, res) {
  const { quantity } = req.body;
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true },
    );
  } catch (error) {
    res.json(500).json({ message: error.message });
  }

  res.status(200).json({ message: "item quantity updated" });
};


module.exports = { addToCart, getUserCart, removeCartItem, updateCartQuantity };
