import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        const productsWithCategories = await Promise.all(
          data.map(async (product) => {
            const categoryResponse = await fetch(
              `http://localhost:8000/api/user/categories/${product.category}`
            );
            const categoryData = await categoryResponse.json();
            return { ...product, category: categoryData };
          })
        );
        setProducts(productsWithCategories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Category: {product.category.name}</p>
          <p>Brand: {product.brand}</p>
          {product.productImages.map((img) => {
            return <img src={img} alt="" className="h-40" />;
          })}
          <p>Price: ${product.price}</p>
          {/* Render other product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default App;
