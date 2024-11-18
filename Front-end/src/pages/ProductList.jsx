  import React, { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import ProductItem from "./ProductItem";
  import allProducts from '../stores/products'; // Import product data

  const ProductList = () => {
    const [visibleCount, setVisibleCount] = useState(8); // Number of initially visible products
    const [sortOption, setSortOption] = useState('default'); // Sorting option
    const location = useLocation(); // Get current location

    const handleLoadMore = () => {
      setVisibleCount(prevCount => prevCount + 8); // Increase visible count by 8 on each click
    };

    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    };

    let sortedProducts = allProducts;

    switch (sortOption) {
      case 'price-low-to-high':
        sortedProducts = allProducts.slice().sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sortedProducts = allProducts.slice().sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = allProducts;
    }

    const isHomePage = location.pathname === "/";

    return (
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold pt-6 mb-4">List Products</h1>
        <div className="flex justify-between mb-4">
          <select value={sortOption} onChange={handleSortChange} className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5">
            <option value="default">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.slice(0, isHomePage ? visibleCount : sortedProducts.length).map(product => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </div>
        {isHomePage && visibleCount < sortedProducts.length && (
          <div className="flex justify-center mt-8">
            <Link to="items">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                More Items
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  export default ProductList;
