import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    mrp: "",
    stock: "",
    discount: "",
    desc: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const productData = new FormData();

    Object.keys(formData).forEach(key => {
      productData.append(key, formData[key]);
    });

    productData.append("productImage", image);

    try {
      // const res = await axios.post(
      //   "http://localhost:8080/product",
      //   productData,
      // );

      const res = await axios.post(
        "https://e-commerce-development.onrender.com/product",
        productData,
      );

      console.log(res.data);
      toast.success("Product Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Add Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div>
              <label className="block mb-2 text-slate-300">Product Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="iPhone 15 Pro Max"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-slate-300">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none">
                <option value="">Select Category</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="headphone">Headphone</option>
                <option value="smartwatch">Smart Watch</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-2 text-slate-300">Brand</label>

              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none">
                {" "}
                <option value="">Select Brand</option>
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option value="oneplus">OnePlus</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="realme">Realme</option>
                <option value="boat">Boat</option>
                <option value="hp">HP</option>
                <option value="dell">Dell</option>
                <option value="lenovo">Lenovo</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-slate-300">Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="129999"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              />
            </div>

            {/* MRP */}
            <div>
              <label className="block mb-2 text-slate-300">MRP</label>

              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                placeholder="139999"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 text-slate-300">Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="50"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block mb-2 text-slate-300">Discount %</label>

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="10"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Poster Image */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1">
                <label className="block mb-2 text-slate-300">
                  Poster Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-24 h-24 rounded-lg object-cover border border-slate-700"
                />
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mt-5">
            <label className="block mb-2 text-slate-300">Description</label>

            <textarea
              rows="6"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Enter product description..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none resize-none"
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800">
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
