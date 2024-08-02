import React from "react";
import { useEffect, useState } from "react";
import { CarouselSpacing } from "./HeroCarousel";
import axios from "../utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BadgeIndianRupee, IndianRupee, LucideIndianRupee } from "lucide-react";
export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/user/products");
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
    <div className="px-16">
      <CarouselSpacing />
      <div className="mx-14 md:mx-auto my-10">
        <Card>
          <CardHeader>
            <CardTitle className="md:text-3xl text-center font-bold">
              "Shop Your Vibe, Feel the Cart, Discover Your Perfect Groove with
              Vibestore"
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="text-lg font-semibold">Made For You</div>
      <div className="grid-cols-5 grid gap-4 py-4">
        {products.map((product) => {
          return (
            <Card key={product._id} className="max-w-xs">
              <CardHeader>
                <img src={product.productImages[0]} alt="" />
                <CardTitle>{product.title}</CardTitle>
                <CardDescription className="pt-1">
                  <Badge variant="outline">{product.brand}</Badge>
                </CardDescription>
                <CardDescription className="flex text-xl items-center pt-2 -m-1">
                  <LucideIndianRupee />
                  {product.price} -/
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <Button variant="">Buy Now</Button>
                <Button variant="outline">Add To Cart</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
