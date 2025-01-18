import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";

const API_URL = "http://localhost:8000/api/v1/category"; // Move API URL to constant

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // More descriptive state
  const [editMode, setEditMode] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null); // Clear any previous error
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/category",
        {
          withCredentials: true,
        }
      );
      setCategories(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setCategoryFormData({
        id: category._id,
        name: category.name,
        image: category.image,
      });
      setEditMode(true);
    } else {
      setCategoryFormData({
        id: null,
        name: "",
        image: "",
      });
      setEditMode(false);
    }
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCategoryFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleCreateCategory = async () => {
    setLoading(true); // Start loading before the operation begins
    try {
      const res = await axios.post(
        API_URL,
        {
          name: categoryFormData.name,
          image: categoryFormData.image,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Show success toast and refresh categories
        toast.success(res.data.message);
        fetchCategories();
      } else {
        // Show error message from response
        toast.error(res.data.message || "Failed to create the category");
      }
    } catch (err) {
      // Handle network or unexpected errors
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to create the category"
      );
    } finally {
      // Always reset loading and close the dialog
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/${categoryFormData.id}`,
        {
          name: categoryFormData.name,
          image: categoryFormData.image,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCategories();
      } else {
        toast.error(res.data.message || "Failed to update the category");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update the category");
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCategories();
      } else {
        toast.error(res.data.message || "Failed to delete the category");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete the category");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
    }
  };
  // Render loading state
  // rest of imports
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Loader Animation */}
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="text-green-500 h-8 w-8" />
            </div>
          </div>
          {/* Loading Text */}
          <p className="text-lg font-medium text-gray-700 animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex bg-red-900 h-screen items-center justify-center">
        <p className="text-white">Error: {error}</p>
      </div>
    );
  }
  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col items-center  md:ml-56 lg:ml-52 w-full justify-center h-full px-6 ml-14 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Category List
        </h1>
        {categories && categories.length > 0 ? (
          <div className="w-full flex flex-col">
            <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
              <table className="table-auto w-full">
                <thead className="bg-green-400">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Category Name
                    </th>

                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Edit
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-gray-600">
                        {category.name}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        <Button
                          onClick={() => handleOpenDialog(category)}
                          variant="ghost"
                          className="text-green-600 hover:bg-green-100"
                        >
                          <MdEdit className="h-5 w-5" />
                        </Button>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <Button
                          onClick={() => handleDeleteCategory(category._id)}
                          variant="ghost"
                          className="text-red-600 hover:bg-red-100"
                        >
                          <MdDelete className="h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No categories available</p>
        )}
        <Button
          onClick={() => handleOpenDialog()}
          className="mt-4 bg-green-500 text-white hover:bg-green-600"
        >
          <IoAddSharp className="h-6 text-black mr-2" />
          Add Category
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-sm sm:rounded-md sm:max-w-xl md:max-w-2xl  lg:max-w-3xl w-full rounded-md  p-0 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-center p-4">
                {editMode ? "Update" : "Create"} Category
              </DialogTitle>
              <DialogDescription className="text-center p-4">
                {editMode
                  ? "Edit category name  here. Click save when you're done."
                  : "Enter the new category name.."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4 px-4">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="text-right text-sm font-medium text-gray-700"
                ></label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Category name"
                  value={categoryFormData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <DialogFooter>
                <Button className="bg-green-500" type="submit">
                  {editMode ? "Update Category" : "Add Category"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryList;
