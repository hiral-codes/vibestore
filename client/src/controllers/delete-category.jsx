import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "../utils/api";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderIcon } from "lucide-react";

function DeleteCategory({ onClose }) {
  const [categories, setCategories] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/user/categories`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching Categories", error);
        toast({ description: "Error fetching categories", status: "error" });
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/admin/categories/${id}`);
      toast({ description: "Category deleted", status: "success" });
      setDeleteLoading(false);
      setSelectedCategory(null);
      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({ description: "Error deleting category", status: "error" });
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 p-4 sm:p-0">
      <Card className="relative z-10 max-w-lg w-full">
        <CardHeader>
          <CardTitle>Delete Categories</CardTitle>
          <CardDescription>
            You can delete the categories from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoaderIcon />
          ) : (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat._id} className="flex justify-between items-center">
                  <Badge variant="secondary" className="p-2">
                    {cat.name}
                  </Badge>
                  <Button
                    variant=""
                    onClick={() => confirmDelete(cat)}
                    disabled={deleteLoading}
                    className="h-8"
                  >
                    {deleteLoading && selectedCategory?._id === cat._id ? (
                      <LoaderIcon size="small" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
      {selectedCategory && (
        <AlertDialog open={true} onOpenChange={() => setSelectedCategory(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category "{selectedCategory.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedCategory(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteCategory(selectedCategory._id)}
              >
                {deleteLoading ? <LoaderIcon size="small" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default DeleteCategory;
