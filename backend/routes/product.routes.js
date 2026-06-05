const upload = require("../config/multer");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

const router = require("express").Router();

//api endpoint or routers
router.post("/", upload.single("productImage"), createProduct);

// get all product
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);

router.put("/:id", upload.single("productImage"), updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
