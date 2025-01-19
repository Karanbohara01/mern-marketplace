import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);

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
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-950 text-white justify-center h-screen w-screen">
      <form
        onSubmit={signupHandler}
        className="shadow-lg border rounded-sm border-white flex flex-col min-w-96 gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="font-bold text-xl text-center py-2">Koselie</h1>
          <p className="text-sm text-center">
            Signup to see videos and photos of people
          </p>
        </div>
        <div className="">
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div className="">
          <Label>email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div className="">
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent text-black my-2"
          />
        </div>
        {isLoading ? (
          <Button>
            Please wait
            <Loader2 className="w-4 mr-2 animate-spin" />
          </Button>
        ) : (
          <Button className="bg-green-500 hover:bg-green-600" type="submit">
            Signup
          </Button>
        )}

        <span className="text-center ">
          Already have an account?{" "}
          <Link className="text-blue-500 underline " to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
