import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { MdLock, MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PB from "../api/pocketbase.config";
import { useEffect, useState } from "react";
import { useAuth } from "../store";

function Login() {
  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const login = async () => {
    try {
      if (data.emailOrUsername !== "" && data.password !== "") {
        PB.collection("users")
          .authWithPassword(data.emailOrUsername, data.password)
          .then(() => {
            setIsAuthenticated(PB.authStore.isValid);
            navigate("/");
          })
          .catch((e) => {
            alert(`I think you don't provided correct info.\n${e}`);
          });
      } else {
        alert("Input field should not be empty");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <div className="grid h-screen items-center justify-center">
      <div className="bg-neutral-100 rounded-lg drop-shadow-md">
        <div className="border-b border-red-400">
          <h1 className="text-[36px] text-center font-bold text-purple-500 font-[Roboto]">
            Roommate
          </h1>
        </div>
        <div className="space-y-3 p-3">
          <p className="text-lg font-medium text-black/50">
            Login your Account
          </p>
          <span className="flex flex-row gap-2 items-center bg-white p-2 drop-shadow-md rounded-md">
            <MdOutlineAlternateEmail size={24} />
            <input
              type="email"
              name="email"
              id="email"
              className="w-80 bg-transparent focus:outline-none"
              placeholder="Email/Username"
              onChange={(e) =>
                setData({ ...data, emailOrUsername: e.target.value })
              }
            />
          </span>
          <span className="flex flex-row gap-2 items-center bg-white p-2 drop-shadow-md rounded-md">
            <MdLock size={24} />
            <input
              type="password"
              name="password"
              id="password"
              className="w-80 bg-transparent focus:outline-none"
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </span>
          <span className="flex flex-row w-full items-center justify-end">
            <Link
              to={"/"}
              className="font-medium text-blue-600 text-lg text-end"
            >
              Forget password
            </Link>
          </span>
          <span className="flex flex-row gap-2 items-center bg-blue-500 p-2 drop-shadow-md rounded-md">
            <button
              name="email"
              id="email"
              className="w-80 bg-transparent focus:outline-none text-white font-medium text-lg"
              onClick={() => login()}
            >
              Login
            </button>
          </span>
        </div>
        <div className=" space-y-3 p-3">
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <FcGoogle size={24} />
            <p className="font-medium text-lg">Login with google</p>
          </span>
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <IoLogoFacebook color="blue" size={24} />
            <p className="font-medium text-lg">Login with Facebook</p>
          </span>
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <BsApple color="silver" size={24} />
            <p className="font-medium text-lg">Login with Apple</p>
          </span>
        </div>
        <div className="p-3">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/registration"}
              className="font-semibold underline text-lg text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
