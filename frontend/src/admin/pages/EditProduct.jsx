import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {
    const navigate = useNavigate();
  const { id } = useParams();
const [image, setImage] = useState(null);
// const [poster, setPoster] = useState("");
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

   if (image) {
     productData.append("productImage", image);
   }

   try {
     await axios.put(`http://localhost:8080/product/${id}`, productData);

toast.success("Product Updated Successfully");
navigate("/admin/products");   } catch (error) {
     console.log(error);
   }
 };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/product/${id}`);
    console.log("POSTER URL:", res.data.data.poster);

        setFormData({
          name: res.data.data.name || "",
          category: res.data.data.category || "",
          brand: res.data.data.brand || "",
          price: res.data.data.price || "",
          mrp: res.data.data.mrp || "",
          stock: res.data.data.stock || "",
          discount: res.data.data.discount || "",
          desc: res.data.data.desc || "",
        });
        // setPoster(res.data.data.poster);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!formData.name) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-slate-300">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-slate-300">
              Upload New Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="text-white border px-2 py-2"
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg mt-4 border border-slate-700"
              />
            )}
          </div>
{/* 
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="text-white"
            />
          </div> */}

          <div className="mt-5">
            <label className="block mb-2 text-slate-300">Description</label>
            <textarea
              rows="5"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;


