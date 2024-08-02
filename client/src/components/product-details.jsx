import React from "react";
import { Card, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import axios from "../utils/api";
function ProductDetails() {
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "/user/product/668ce9fbbbcd4a3764a391eb"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed To Fetch Products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Card key={product._id}>
        <CardTitle>{product.title}</CardTitle>
      </Card>
    </div>
  );
}

export default ProductDetails;
