import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Confirm } from "notiflix";

const Products = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get("http://localhost:8080/product?limit=100");
        const res = await axios.get(
          "https://e-commerce-development.onrender.com/product?limit=100",
        );

        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

 const handleDelete = async id => {
   Confirm.show(
     "Delete Product",
     "Are you sure you want to delete this product?",
     "Delete",
     "Cancel",
     async () => {
       try {
        //  await axios.delete(`http://localhost:8080/product/${id}`);
        await axios.delete(
          `https://e-commerce-development.onrender.com/product/${id}`,
        );

         setProducts(prev => prev.filter(product => product._id !== id));

         toast.success("Product Deleted Successfully");
       } catch (error) {
         console.log(error);
       }
     },
     () => {
       toast.info("Delete Cancelled");
     },
   );
 };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {" "}
            Products ({products.length})
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
          />
          <Link
            to="/admin/add-product"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
            + Add Product
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-center  py-3">Image</th>
                <th className="w-[25%] text-center py-3">Product</th>
                <th className="w-[15%] text-center py-3">Category</th>
                <th className="w-[12%] text-center py-3">Price</th>
                <th className="w-[10%] text-center py-3">Stock</th>
                <th className="w-[15%] text-center py-3">Status</th>
                <th className="w-[15%] text-center py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id} className="border-b border-slate-800">
                  <td className="py-4">
                    <div className="flex justify-center">
                      {" "}
                      <img
                        src={product.poster}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-slate-700"
                      />
                    </div>
                  </td>

                  <td className="text-center">{product.name}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">₹{product.price}</td>
                  <td className="text-center">{product.stock}</td>

                  <td className="w-[15%] text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-[110px] px-3 py-1 rounded-full text-sm ${
                        product.stock > 0 ? "bg-green-600" : "bg-red-600"
                      }`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="px-2.5 py-1 rounded bg-green-600 hover:bg-green-700 inline-block text-sm">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-sm">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
