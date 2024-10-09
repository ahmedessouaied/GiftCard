import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Netflix Gift Card', price: 25, image: '/api/placeholder/200/200' },
  { id: 2, name: 'Google Play Gift Card', price: 50, image: '/api/placeholder/200/200' },
  { id: 3, name: 'Amazon Gift Card', price: 100, image: '/api/placeholder/200/200' },
  { id: 4, name: 'iTunes Gift Card', price: 25, image: '/api/placeholder/200/200' },
  { id: 5, name: 'Xbox Gift Card', price: 60, image: '/api/placeholder/200/200' },
  { id: 6, name: 'PlayStation Store Gift Card', price: 50, image: '/api/placeholder/200/200' },
];

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
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Introductory Bar */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Gift Card Shop</h1>
          <p className="text-xl">Find the perfect digital gift for any occasion</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Available Gift Cards</h2>
        <div className="flex flex-row flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;