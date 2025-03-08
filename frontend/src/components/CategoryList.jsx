// export default CategoryList;
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
import { setCategories } from "@/redux/categorySlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

const API_URL = "http://localhost:8000/api/v1/category";

const CategoryList = () => {
  const { categories } = useSelector((store) => store.category); // Access categories from Redux state
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      dispatch(setCategories(response.data)); // Dispatch the categories to Redux
    } catch (err) {
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setCategoryFormData({ id: category._id, name: category.name });
      setEditMode(true);
    } else {
      setCategoryFormData({ id: null, name: "" });
      setEditMode(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await handleUpdateCategory();
    } else {
      await handleCreateCategory();
    }
  };

  const handleCreateCategory = async () => {
    try {
      const res = await axios.post(
        API_URL,
        { name: categoryFormData.name },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message) || "Category created successfully";
        dispatch(setCategories([...categories, res.data])); // Dispatch the newly created category.
        setIsDialogOpen(false);
      } else {
        toast.error(res.data.message || "Failed to create category");
      }
    } catch (err) {
      toast.error(err.message || "Failed to create category");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/${categoryFormData.id}`,
        { name: categoryFormData.name },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setCategories(
            categories.map((cat) =>
              cat._id === categoryFormData.id
                ? { ...cat, name: categoryFormData.name }
                : cat
            )
          )
        ); // Update the Redux store
        setIsDialogOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update category");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const res = await axios.delete(`${API_URL}/${categoryId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedCategoryData = categories.filter(
          (categoryItem) => categoryItem._id !== categoryId
        );
        dispatch(setCategories(updatedCategoryData));
      } else {
        toast.error(res.data.message || "Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin h-12 w-12 text-gray-600" />
          <p className="text-gray-600 font-medium">Loading Categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
            <span className="text-red-600 text-xl">!</span>
          </div>
          <p className="text-gray-800 font-medium">Error loading categories</p>
          <p className="text-gray-500 text-sm max-w-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <IoAddSharp className="h-5 w-5 mr-2" />
          Add Category
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    <Button
                      onClick={() => handleOpenDialog(category)}
                      variant="outline"
                      size="sm"
                      className="text-indigo-600 border-indigo-100 hover:bg-indigo-50"
                    >
                      <MdEdit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(category._id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-100 hover:bg-red-50"
                    >
                      <MdDelete className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-gray-900 font-medium">No categories found</h3>
          <p className="mt-1 text-gray-500">
            Get started by creating a new category
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-lg sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {editMode ? "Edit Category" : "New Category"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update your category details below"
                : "Enter the details for your new category"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <Input
                id="name"
                value={categoryFormData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="focus:ring-white focus:border-white"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="text-gray-700"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-gray-800">
                {editMode ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryList;
