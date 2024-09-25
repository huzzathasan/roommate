import { useNavigate } from "react-router-dom";

function NotAuthentic() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-col justify-center h-screen gap-6">
      <img src="/logo.png" alt="" className="w-24 h-24" />
      <p className="text-2xl">You are not logged.</p>
      <div className=" flex gap-3">
        <button
          className="bg-neutral-300 px-6 font-medium rounded-md py-2"
          onClick={() => navigate("login")}
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white font-medium px-3 rounded-md py-2"
          onClick={() => navigate("registration")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default NotAuthentic;
