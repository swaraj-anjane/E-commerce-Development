import React, { useEffect, useState } from "react";
import {
  FaFilter,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import { getAllproductApi } from "../service/apiCollections";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getAllproductAsync } from "../redux/productSlice";
import { useLocation, useSearchParams } from "react-router";

export default function ProductPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isLoading, productList } = useSelector(store => store.product);
  const products = productList;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  

  console.log(searchParams.toString());

 const handleSearchPrams = (name, value) => {
   if (!value || value.toLowerCase() === "all") {
     setSearchParams(prev => {
       let params = new URLSearchParams(prev);

       params.delete(name);

       return params;
     });

     return;
   }

   setSearchParams(prev => {
     let params = new URLSearchParams(prev);

     params.set(name, value);

     return params;
   });
 };

  async function loadProduct() {
    try {
      let response = await dispatch(
        getAllproductAsync(searchParams.toString()),
      ).unwrap();
      setPages(Math.ceil(response.total / response.limit)); //update
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.message || "falid to load products");
    }
  }

  useEffect(() => {
    if (location.state?.focusSearch) {
      setTimeout(() => {
        const searchInput = document.getElementById("product-search");

        if (searchInput) {
          searchInput.focus();

          searchInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 200);
    }
  }, [location]);

  useEffect(() => {
    loadProduct();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center w-screen">
        Loading...
      </div>
    );
  }

  // useEffect(() => {
  //   dispatch(getAllproductAsync(currentPage));
  // }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-4 sm:px-6 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-gray-500">
              Discover Products
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">
              Shop Collection
            </h1>
          </div>
          <div
            className="
    flex items-center gap-2 border rounded-full px-4 py-3
    transition-all duration-300
    focus-within:border-violet-600
    focus-within:shadow-lg
    focus-within:shadow-violet-200
  ">
          <FaSearch
  className="cursor-pointer"
/>
            <input
              id="product-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
              className="outline-none bg-transparent w-full"
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            "All",
            "Fashion",
            "Electronics",
            "Footwear",
            "Beauty",
            "Home Decor",
            "shoes",
          ].map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCategory(cat);
                handleSearchPrams("category", cat);
              }}
              className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap cursor-pointer font-medium transition-all duration-300 border

      ${
        selectedCategory === cat ?
          "bg-black text-white border-black shadow-lg scale-105"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:border-transparent hover:shadow-xl "
      }

      `}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          <div className="bg-white rounded-[28px] shadow-[0_10px_25px_rgba(0,0,0,0.04)] p-5 sticky top-20 hidden lg:block">
            <h2 className="font-bold text-lg mb-5">Quick Filters</h2>
            <div className="space-y-5 text-sm">
              <div>
                <p className="font-medium mb-2">Price Range</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p className="font-medium mb-2">Customer Rating</p>
                <div className="space-y-2 text-gray-600">
                  <p>4★ & above</p>
                  <p>3★ & above</p>
                  <p>2★ & above</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Availability</p>
                <p className="text-gray-600">In Stock Only</p>
              </div>
            </div>
          </div>
          <div>
            {products?.length > 0 ?
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            : <div className="h-[60dvh] w-full flex items-center justify-center ">
                No product found !!
              </div>
            }
            <div className="mt-6 flex items-center gap-x-3 cursor-pointer">
              {Array.from({ length: pages }, (item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx + 1);

                    setSearchParams(prev => {
                      let params = new URLSearchParams(prev);

                      params.set("page", idx + 1);

                      return params;
                    });
                  }}
                  className={`size-10 flex items-center justify-center rounded-md font-medium transition cursor-pointer 
      

        ${
          currentPage === idx + 1 ?
            "bg-black text-white"
          : "bg-gray-200 text-black hover:shadow-xl hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:border-transparent"
        }

      `}>
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
