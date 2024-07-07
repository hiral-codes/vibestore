import { useState, useEffect } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddProduct from "./addProduct";
import axios from "../utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EditProduct from "./editProduct";

export default function Products() {
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleEditClick = (id) => {
    setSelectedProductId(id);
    setEditVisible(true);
  };
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, [isAddProductVisible]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/user/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddCategory = () => {
    setIsAddCategoryVisible(true);
  };

  const handleCloseAddCategory = () => {
    setIsAddCategoryVisible(false);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/categories", { name: newCategory });
      toast({ description: "Category added successfully!" });
      setNewCategory("");
      setIsAddCategoryVisible(false);
      fetchProducts();
    } catch (error) {
      toast({ description: "There was an error adding the category!" });
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      {isAddProductVisible && (
        <AddProduct onClose={() => setIsAddProductVisible(false)} />
      )}
      <Card
        className={isAddProductVisible || isAddCategoryVisible ? "blur-sm" : ""}
      >
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products here.</CardDescription>
          <div className="pt-4 flex space-x-2">
            <Button onClick={() => setIsAddProductVisible(true)}>
              <PlusCircle className="mr-2 h-6" />
              Add Product
            </Button>
            <Button onClick={handleAddCategory}>
              <PlusCircle className="mr-2 h-6" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">img</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Product img"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.productImages[0] || "default-image-url"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(product.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Button
                            className="w-full"
                            onClick={() => handleEditClick(product._id)}
                          >
                            Edit
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button className="w-full">Delete</Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {products.length > 0 &&
                Array.from(
                  { length: Math.ceil(products.length / itemsPerPage) },
                  (_, index) => (
                    <PaginationItem key={index} className="cursor-pointer">
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => paginate(index + 1)}
                        isActive={index + 1 === currentPage}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
              <PaginationNext
                className="cursor-pointer"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= products.length}
              />
            </PaginationContent>
          </Pagination>
          <div className="w-fit text-nowrap text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, products.length)}
            </strong>{" "}
            of <strong>{products.length}</strong> products
          </div>
        </CardFooter>
      </Card>

      {isAddCategoryVisible && (
        <div className="fixed p-4 sm:p-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="relative z-10 max-w-lg w-full">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
              <CardDescription>
                Enter the name of the new category.
              </CardDescription>
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
                  <Button
                    variant="ghost"
                    onClick={handleCloseAddCategory}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Category"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {isEditVisible && (
        <EditProduct
          productId={selectedProductId}
          onClose={() => setEditVisible(false)}
        />
      )}
    </div>
  );
}
