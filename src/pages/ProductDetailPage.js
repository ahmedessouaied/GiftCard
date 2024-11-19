import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { app } from '../firebase'; // Assuming firebase configuration is here
import { getDatabase, ref, get } from 'firebase/database';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const db = getDatabase(app); // Initialize Firebase Realtime Database
    const productRef = ref(db, `products/${id}`); // Reference to the specific product by ID

    // Fetch product data from Firebase
    get(productRef).then((snapshot) => {
      if (snapshot.exists()) {
        setProduct(snapshot.val()); // Set the product state with the fetched data
      } else {
        console.log("No product data found");
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching product:", error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, image, description } = product;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 flex justify-center items-center ">
              <img
                src={image}
                alt={name}
                className="w-64 h-64 object-cover mb-4 rounded"
              />

            </div>

            {/* Product Description */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{name}</h1>
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-6">${price}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
