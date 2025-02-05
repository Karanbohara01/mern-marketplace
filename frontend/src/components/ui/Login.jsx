// import { setAuthUser } from "@/redux/authSlice";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import logo from "../../assets/logo.png";
// import { Button } from "./button";
// import { Input } from "./input";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const signupHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/user/login",
//         input,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setAuthUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//         setInput({
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-950 to-gray-950">
//       <img className="h-28 w-30" src={logo} alt="logo" />
//       <form
//         onSubmit={signupHandler}
//         className="bg-white dark:bg-gray-950 shadow-2xl rounded-lg p-8 w-full max-w-md"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Koselie
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Login to see listings from your friends
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Email
//             </label>
//             <Input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={changeEventHandler}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Password
//             </label>
//             <Input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-black hover:gray-950 text-white py-2 rounded-lg transition-all"
//             disabled={loading}
//           >
//             {loading ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Login"
//             )}
//           </Button>
//           <Link to={"/forgot-password"}>
//             <h1 className="text-center p-4  text-blue-500">Forgot Password?</h1>
//           </Link>
//         </div>

//         <div className="text-center mt-6">
//           <span className="text-gray-600 dark:text-gray-400">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
//             >
//               Sign up
//             </Link>
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/logo.png";
import { Button } from "./button";
import { Input } from "./input";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  // const signupHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:8000/api/v1/user/login",
  //       input,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       dispatch(setAuthUser(res.data.user));

  //       // Navigate based on user role after successful login is handled by useEffect
  //       //  if (res.data.user.role === "admin") {
  //       //   navigate("/admin/dashboard");
  //       // } else {
  //       //    navigate("/");
  //       //  }

  //       toast.success(res.data.message);
  //       setInput({
  //         email: "",
  //         password: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data); // Log the response to check if role is being returned

      if (res.data.success) {
        // Dispatch the user data to the Redux store
        dispatch(setAuthUser(res.data.user));
        // Navigate based on the role
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/"); // Non-admin users go to the homepage
        }
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-950 to-gray-950">
      <img className="h-28 w-30" src={logo} alt="logo" />
      <form
        onSubmit={signupHandler}
        className="bg-white dark:bg-gray-950 shadow-2xl rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Koselie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Login to see listings from your friends
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:gray-950 text-white py-2 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <Link to={"/forgot-password"}>
            <h1 className="text-center p-4  text-blue-500">Forgot Password?</h1>
          </Link>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
