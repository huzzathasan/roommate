import { useEffect, useState } from "react";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { MdLock, MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store";
import PB from "../api/pocketbase.config";

function Registration() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const registration = async () => {
    if (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.passwordConfirm !== "" &&
      formData.password === formData.passwordConfirm
    ) {
      try {
        await PB.collection("users")
          .create(formData)
          .then(async () => {
            await PB.collection("users")
              .authWithPassword(formData.email, formData.password)
              .then(() => setIsAuthenticated(true))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      } catch (error) {
        alert(error);
      } finally {
        formData.email = "";
        formData.password = "";
        formData.passwordConfirm = "";
      }
    } else {
      alert("Input field should not be Empty");
    }
  };

  return (
    <div className="grid h-screen items-center justify-center">
      <div className="bg-neutral-100 rounded-lg drop-shadow-md">
        <div className="border-b border-red-400">
          <h1 className="text-[36px] text-center font-bold text-purple-500 font-[Roboto]">
            Roommate
          </h1>
        </div>
        <div className="space-y-3 p-3">
          <p className="text-lg font-medium text-black/50">Create an Account</p>
          <span className="flex flex-row gap-2 items-center bg-white p-2 drop-shadow-md rounded-md">
            <MdOutlineAlternateEmail size={24} />
            <input
              type={"email" || "text"}
              name="email"
              id="email"
              className="w-80 bg-transparent focus:outline-none"
              placeholder="Email/Username"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </span>
          <span className="flex flex-row gap-2 items-center bg-white p-2 drop-shadow-md rounded-md">
            <MdLock size={24} />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              className="w-80 bg-transparent focus:outline-none"
              placeholder="Password Confirm"
              value={formData.passwordConfirm}
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
            />
          </span>
          <span className="flex flex-row gap-2 items-center bg-blue-500 p-2 drop-shadow-md rounded-md">
            <button
              name="email"
              id="email"
              className="w-80 bg-transparent focus:outline-none text-white font-medium text-lg"
              onClick={() => registration()}
            >
              Register
            </button>
          </span>
        </div>
        <div className=" space-y-3 p-3">
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <FcGoogle size={24} />
            <p className="font-medium text-lg">Register with google</p>
          </span>
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <IoLogoFacebook color="blue" size={24} />
            <p className="font-medium text-lg">Register with Facebook</p>
          </span>
          <span className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-white/75 bg-white p-2 drop-shadow-md rounded-md">
            <BsApple color="silver" size={24} />
            <p className="font-medium text-lg">Register with Apple</p>
          </span>
        </div>
        <div className="p-3">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold underline text-lg text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
