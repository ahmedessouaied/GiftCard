import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from './firebase'; // Updated import for database
import { getDatabase, ref, onValue } from 'firebase/database';

const ProductCard = ({ product }) => (
  <div className="w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 m-4 overflow-hidden">
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 font-bold">${product.price}</p>
    </div>
    <div className="px-4 pb-4">
      <Link
        to={`/product/${product.id}`}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        View
      </Link>
    </div>
  </div>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery));

  useEffect(() => {
    const db = getDatabase(); // Use the initialized database
    const productsRef = ref(db, 'products/'); // Reference to the 'products' path

    // Fetch products from Firebase
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object into an array of products
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(productsArray); // Update state with fetched products
      } else {
        setProducts([]); // If no data, set empty array
      }
      setLoading(false); // Set loading to false
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false); // Set loading to false on error
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Introductory Bar */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl text-center font-bold mb-2">Gift Card Shop</h1>
          <p className="text-xl text-center">Find the perfect digital gift for any occasion</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto py-4 flex justify-end">
        <input
          type="text"
          placeholder="Search for a gift card..."
          className="w-64 p-3 rounded-lg shadow-md mr-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Available Gift Cards:</h2>
        <div className="flex flex-row flex-wrap justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found for "{searchQuery}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
