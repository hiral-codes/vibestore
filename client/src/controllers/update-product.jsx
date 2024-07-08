import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "../utils/api";
import { LoaderIcon } from "lucide-react";

function EditProduct({ productId, onClose }) {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`/user/products/${productId}`);
      const product = response.data;
      setFormData({
        title: product.title,
        description: product.description,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
      });
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast({ description: "Error fetching product data!" });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`/admin/update-product/${productId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      toast({ description: "Product updated successfully!" });
      onClose();
    } catch (error) {
      setLoading(false);
      toast({ description: "There was an error updating the product!" });
      console.error("Error updating the product:", error);
    }
  };

  if (!isDataLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed p-4 sm:p-0 inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <Card className="relative z-10 max-w-lg w-full">
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>
              Update the details of the product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  type="text"
                  className="w-full"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-10"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  className="w-full"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="text"
                  className="w-full"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <LoaderIcon className="mr-2 animate-spin" />
                  Please Wait
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default EditProduct;
