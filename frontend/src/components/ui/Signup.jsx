// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { Button } from "./button";
// import { Input } from "./input";
// import { Label } from "./label";

// const Signup = () => {
//   const [input, setInput] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//     setError(""); // Reset error when user changes input
//   };

//   const signupHandler = async (e) => {
//     e.preventDefault();

//     // Simple validation check
//     if (!input.username || !input.email || !input.password) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/user/register",
//         input,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//         setInput({
//           username: "",
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response?.data?.message || "An error occurred");
//       toast.error(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center bg-gray-800 text-white justify-center h-screen w-screen">
//       <form
//         onSubmit={signupHandler}
//         className="shadow-lg border rounded-sm border-white flex flex-col min-w-96 gap-5 p-8"
//       >
//         <div className="my-4">
//           <h1 className="font-bold text-xl text-center py-2">Koselie</h1>
//           <p className="text-sm text-center">
//             Signup to see videos and photos of people
//           </p>
//         </div>

//         <div className="">
//           <Label>Username</Label>
//           <Input
//             type="text"
//             name="username"
//             value={input.username}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent text-black my-2"
//           />
//         </div>

//         <div className="">
//           <Label>Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent text-black my-2"
//           />
//         </div>

//         <div className="">
//           <Label>Password</Label>
//           <Input
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={changeEventHandler}
//             className="focus-visible:ring-transparent text-black my-2"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         {isLoading ? (
//           <Button>
//             Please wait
//             <Loader2 className="w-4 mr-2 animate-spin" />
//           </Button>
//         ) : (
//           <Button className="bg-green-500 hover:bg-green-600" type="submit">
//             Signup
//           </Button>
//         )}

//         <span className="text-center ">
//           Already have an account?{" "}
//           <Link className="text-blue-500 underline " to="/login">
//             Login
//           </Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/logo.png";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(""); // Reset error when user changes input
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    // Simple validation check
    if (!input.username || !input.email || !input.password) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-black to-black text-white">
      <img className="h-28 w-30" src={logo} alt="" />
      <form
        onSubmit={signupHandler}
        className="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Koselie</h1>
          <p className="text-gray-600 text-sm">
            Sign up to explore amazing content
          </p>
        </div>

        <div>
          <Label className="text-gray-700">Username</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-black text-gray-800 border-gray-300 my-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label className="text-gray-700">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-black text-gray-800 border-gray-300 my-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label className="text-gray-700">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-black text-gray-800 border-gray-300 my-2 rounded-md shadow-sm"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex justify-center">
          {isLoading ? (
            <Button className="w-full bg-black hover:bg-black text-white font-semibold py-2 rounded-md flex items-center justify-center">
              Please wait
              <Loader2 className="w-4 ml-2 animate-spin" />
            </Button>
          ) : (
            <Button
              className="w-full bg-black hover:bg-black text-white font-semibold py-2 rounded-md"
              type="submit"
            >
              Signup
            </Button>
          )}
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
