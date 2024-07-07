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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderIcon } from "lucide-react";

function EditProduct({ productId, onClose }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/user/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({ description: "Error fetching categories!" });
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`/user/products/${productId}`);
      const product = response.data;
      setFormData({
        name: product.title,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        stock: product.stock,
        images: [], // Not populating images since they can't be edited directly
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

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      toast({ description: "Please fill all required fields!" });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.name);
    data.append("description", formData.description);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("productImages", formData.images[i]);
    }

    try {
      await axios.patch(`/admin/update-product/${productId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  value={formData.name}
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
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  className="w-full"
                  multiple
                  onChange={handleImageChange}
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
                "Update Product"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default EditProduct;
