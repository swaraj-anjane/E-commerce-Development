const UserModel = require("../model/user.model");
const ProductModel = require("../model/product.model");
const OrderModel = require("../model/order.model");

async function getDashboardStats(req, res) {



  try {
    const totalUsers = await UserModel.countDocuments();

    const totalProducts = await ProductModel.countDocuments();

    const totalOrders = await OrderModel.countDocuments();

    const lowStockProducts = await ProductModel.countDocuments({
      stock: { $lt: 10 },
    });

    const revenueData = await OrderModel.find({
      orderStatus: "delivered",
    });

    const totalRevenue = revenueData.reduce(
      (acc, item) => acc + item.totalAmount,
      0,
    );

    res.status(200).json({
      message: "dashboard stats fetched successfully",
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { getDashboardStats };
