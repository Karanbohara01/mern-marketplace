import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import toast from sonner
import { setAllUsers, setSelectedUser } from "../redux/authSlice";

const API_URL = "http://localhost:8000/api/v1/user";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, user } = useSelector((store) => store.auth); // Access the logged-in user
  useGetAllUsers();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenDeleteDialog = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUserId(null);
  };

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/${selectedUserId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message); // Use toast.success

        // Update the Redux state to remove the deleted user from the users list
        dispatch(
          setAllUsers(users.filter((user) => user._id !== selectedUserId))
        );

        // Optionally, if you're keeping local state for users, you could update that here as well:
        // setUsers(prevUsers => prevUsers.filter(user => user._id !== selectedUserId));
      } else {
        toast.error(response.data.message || "Failed to delete user"); // Use toast.error
      }
    } catch (error) {
      toast.error(error.message || "Error deleting user"); // Use toast.error
    } finally {
      handleCloseDeleteDialog();
    }
  };

  return (
    <div className="p-8 w-full bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-4 text-start">
          Manage Users
        </h2>
        <div className="overflow-hidden rounded-none shadow-xl bg-white dark:bg-gray-800">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Username
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">
                  Role
                </th>
                <th className="py-3 px-6 text-center text-sm font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((aUser) => (
                  <tr
                    key={aUser._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
                      {aUser.username || "Unknown"}
                    </td>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
                      {aUser.email || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
                      {aUser.role || "N/A"}
                    </td>

                    <td className="py-4 px-6 text-center flex gap-2 justify-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {aUser.role == "user" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleOpenDeleteDialog(aUser._id)}
                            >
                              <MdDelete className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          )}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={handleCloseDeleteDialog}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteUser}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 px-6 text-center text-gray-600 dark:text-gray-400"
                  >
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
