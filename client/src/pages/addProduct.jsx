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

function AddProduct({ onClose }) {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/user/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      await axios.post("/admin/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast({ description: "Product added successfully!" });
      onClose();
    } catch (error) {
      setLoading(false);
      toast({ description: "There was an error adding the product!" });
      console.error("Error adding the product:", error);
    }
  };

  return (
    <div className="fixed p-4 sm:p-0 inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <Card className="relative z-10 max-w-lg w-full">
          <CardHeader>
            <CardTitle>Let's Add New Product</CardTitle>
            <CardDescription>
              Enter the details for the new product.
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
                  required
                />
              </div>
              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-10"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
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
              {loading
                ? `${(
                    <LoaderIcon className="mr-2 animate-spin repeat-infinite" />
                  )}Please Wait`
                : "Add Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AddProduct;
