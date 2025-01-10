import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  name: string;
  price: number;
  expiry_date: string;
  discount: string;
  retailer_id: string;
  product_image: string[];
  category: string;
  quantity: string;
  description: string;
}

export default function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    expiry_date: "",
    discount: "",
    retailer_id: "",
    product_image: ["", "", ""],
    category: "",
    quantity: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products for the logged-in retailer
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user._id) {
          setError("Retailer ID is not available in local storage.");
          return;
        }
        const { data } = await axios.get(
          `http://localhost:5000/${user._id}/products`
        );
        setProductList(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle input changes for product fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index?: number
  ) => {
    const value = e.target.value;

    if (field === "product_image" && index !== undefined) {
      setNewProduct((prev) => {
        const updatedImages = [...prev.product_image];
        updatedImages[index] = value;
        return { ...prev, product_image: updatedImages };
      });
    } else {
      setNewProduct((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const { data } = await axios.post(
        `http://localhost:5000/${user._id}/products/`,
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
      setProductList([...productList, data]);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewProduct({
      name: "",
      price: 0,
      expiry_date: "",
      discount: "",
      retailer_id: "",
      product_image: ["", "", ""],
      category: "",
      quantity: "",
      description: "",
    });
  };

  return (
    <div className="p-4 bg-white text-black min-h-screen">
      <div className="flex justify-between items-stretch mb-4">
        <h1 className="sm:text-2xl text-lg font-bold mb-4 ml-5 sm:ml-32 mt-5 sm:mt-14">
          Products Management
        </h1>
        <button
          className="mb-4 bg-blue-500 text-white mr-5 mt-5 px-3 py-2 sm:py-3 sm:px-5 sm:mr-32 sm:mt-14 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ New Product"}
        </button>
      </div>

      {/* New Product Form */}
      {showForm && (
        <div className="p-4 rounded mb-4 bg-gray-100">
          {/* Product Name */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full text-black"
              value={newProduct.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Price</label>
            <input
              type="number"
              className="border p-2 rounded w-full text-black"
              value={newProduct.price}
              onChange={(e) => handleInputChange(e, "price")}
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Expiry Date</label>
            <input
              type="date"
              className="border p-2 rounded w-full text-black"
              value={newProduct.expiry_date}
              onChange={(e) => handleInputChange(e, "expiry_date")}
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Discount (%)</label>
            <input
              type="number"
              className="border p-2 rounded w-full text-black"
              value={newProduct.discount}
              onChange={(e) => handleInputChange(e, "discount")}
            />
          </div>

          {/* Product Images */}
          {[0, 1, 2].map((index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 font-semibold">Image {index + 1}</label>
              <input
                type="text"
                className="border p-2 rounded w-full text-black"
                value={newProduct.product_image[index]}
                onChange={(e) => handleInputChange(e, "product_image", index)}
              />
            </div>
          ))}

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              className="border p-2 rounded w-full text-black"
              value={newProduct.category}
              onChange={(e) => handleInputChange(e, "category")}
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Quantity</label>
            <input
              type="number"
              className="border p-2 rounded w-full text-black"
              value={newProduct.quantity}
              onChange={(e) => handleInputChange(e, "quantity")}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              className="border p-2 rounded w-full text-black"
              value={newProduct.description}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={()=>{handleAddProduct()}}
          >
            Submit
          </button>
        </div>
      )}

      {/* Display Products */}
      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            productList.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center"
              >
                <img
                  src={product.product_image[0]} // Display first image from the product_image array
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4"
                />
                <h3 className="text-xl text-black font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-green-500 font-semibold text-2xl">
                    ₹{(
                      product.price -
                      (product.price * Number(product.discount)) / 100
                    ).toFixed(2)}
                  </span>
                  <span className="text-gray-800 relative inline-block ml-3">
                    <span className="absolute inset-0 flex justify-center items-center">
                      <div className="w-7 h-0.5 bg-black transform rotate-45"></div>
                    </span>
                    <span className="text-2xl">₹{product.price}</span>
                  </span>
                  <span className="ml-3 text-gray-700">({product.discount}% off)</span>
                </div>

                <p className="text-gray-500 mb-2 font-semibold">Category: {product.category}</p>
                <p className="text-gray-500 mb-2 font-semibold">Quantity: {product.quantity}</p>
                <p className="text-gray-500 mb-2 font-semibold">Expiry Date: {product.expiry_date}</p>
                <p className="text-gray-600 text-center mb-2 font-medium">{product.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


