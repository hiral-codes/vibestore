import React from "react";
import axios from "../utils/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";

function AddCategory({ onClose }) {
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/categories", { name: newCategory });
      toast({ description: "Category added successfully!" });
      setNewCategory("");
      onClose();
    } catch (error) {
      toast({ description: "There was an error adding the category!" });
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed p-4 sm:p-0 inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50">
      <Card className="relative z-10 max-w-lg w-full">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>Enter the name of the new category.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitCategory}>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid gap-3">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-end gap-4 mt-4">
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
                  "Add Category"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCategory;
