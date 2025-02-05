import { setAllUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/all", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllUsers(res.data.users));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [dispatch]);
};

export default useGetAllUsers;
