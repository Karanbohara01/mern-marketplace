import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const { resetToken } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!resetToken) {
      toast.error("Invalid password reset link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/reset-password/${resetToken}`,
        { newPassword },
        {
          withCredentials: true, // Send cookies if needed
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      // Enhanced error handling
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Reset Your Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
