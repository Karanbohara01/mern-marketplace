import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth); // Accessing user from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login
      navigate("/login");
    } else if (user.role !== "admin") {
      // If the user is not an admin, redirect them to the home page
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default AdminRoutes;
