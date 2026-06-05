const ProductModel = require("../model/product.model");

async function createProduct(req, res) {
  console.log("controller started createProduct");
  console.log(req.body);
  const payload = req.body;
  payload.productCode = `PRD-${Date.now()}`;
  if (req.file) {
let posterurl = `${req.protocol}://${req.get("host")}/${req.file.destination}/${req.file.filename}`;    payload.poster = posterurl;
  console.log("HOST =", req.get("host"));
  console.log("POSTER URL =", posterurl);
  } else {
    payload.poster = `http://jkhkjhkjh.com/img.png`;
  }

  try {
    const product = await ProductModel.create(payload);
    res.status(201).json({
      message: `${product.name} with code ${product.productCode} is added successfully`,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function fetchProducts(req, res) {
  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.price) {
    query.price = req.query.price;
  }

  

  let page = req.query.page || 1;
  let itemPerPage = req.query.limit || 6;
  let skip = (page - 1) * itemPerPage;

  try {
    // const totalProductCount = await ProductModel.countDocuments();
    // const products = await ProductModel.find(query)
    //   .skip(skip)
    //   .limit(itemPerPage);

    const totalProductCount = await ProductModel.countDocuments(query);

    const products = await ProductModel.find(query)
      .skip(skip)
      .limit(itemPerPage);

      console.log(req.query);

    res.status(200).json({
      message: "product fetched successfully",
      data: products,
      limit: itemPerPage,
      total: totalProductCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function fetchProductById(req, res) {
  const { id } = req.params;
  try {
    const products = await ProductModel.findById(id);
    res
      .status(200)
      .json({ message: "product fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await ProductModel.findByIdAndDelete(id);
console.log("Deleted Product:", product);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;

  try {
    const payload = { ...req.body };

   if (req.file) {
     payload.poster = `${req.protocol}://${req.get("host")}/${req.file.destination}/${req.file.filename}`;
   }

    const product = await ProductModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.status(200).json({
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { createProduct, fetchProducts, fetchProductById, deleteProduct, updateProduct};
