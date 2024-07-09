import { useState, useEffect } from "react";
import { Delete, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddProduct from "../controllers/add-product";
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
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import EditProduct from "../controllers/update-product";
import AddCategory from "@/controllers/add-category";
import DeleteCategory from "@/controllers/delete-category";
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

export default function Products() {
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDeleteCat, setIsDeleteCat] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, [isAddProductVisible, isEditVisible]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/user/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setSelectedProductId(id);
    setEditVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/delete-product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast({ description: "Product Deleted", status: "success" });
      setDeleteProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({ description: "Error Deleting Product", status: "error" });
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products here.</CardDescription>
          <div className="pt-4 flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddProductVisible(true)}
            >
              <PlusCircle className="mr-2 h-5" />
              Add Product
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsAddCategoryVisible(true)}
            >
              <PlusCircle className="mr-2 h-5" />
              Add Category
            </Button>
            <Button variant="secondary" onClick={() => setIsDeleteCat(true)}>
              <Delete className="mr-2 h-5" />
              Delete Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
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
                  Last Updated
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <div>Loading...</div>
              ) : currentProducts.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can start selling as soon as you add a product.
                    </p>
                    <Button
                      onClick={() => setIsAddProductVisible(true)}
                      className="mt-4"
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              ) : (
                currentProducts.map((product) => (
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
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>&#x20B9;{formatPrice(product.price)}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs font-bold">
                      {new Date(product.updatedAt).toLocaleString()}
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
                              className="w-full h-7"
                              variant="ghost"
                              onClick={() => handleEditClick(product._id)}
                            >
                              Edit
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              className="w-full h-7"
                              variant="ghost"
                              onClick={() => setDeleteProductId(product._id)}
                            >
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
                Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index} className="cursor-pointer">
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => paginate(index + 1)}
                      isActive={index + 1 === currentPage}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              <PaginationNext
                className="cursor-pointer"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
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

      <span className="sr-only">Add Product</span>
      {isAddProductVisible && (
        <AddProduct onClose={() => setIsAddProductVisible(false)} />
      )}

      <span className="sr-only">Add Category</span>
      {isAddCategoryVisible && (
        <AddCategory
          onClose={() => {
            setIsAddCategoryVisible(false);
          }}
        />
      )}

      <span className="sr-only">Update Product</span>
      {isEditVisible && (
        <EditProduct
          productId={selectedProductId}
          onClose={() => setEditVisible(false)}
        />
      )}
      {isDeleteCat && <DeleteCategory onClose={() => setIsDeleteCat(false)} />}

      {deleteProductId && (
        <AlertDialog open={true} onOpenChange={() => setDeleteProductId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteProductId(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(deleteProductId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
