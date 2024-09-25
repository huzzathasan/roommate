import { useAuth } from "../store";
import PB from "../api/pocketbase.config";
import { BASE_File_URL } from "../helper";
import { MdClose, MdLogout, MdPerson } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const logout = async () => {
    PB.authStore.clear();
    setIsAuthenticated(isAuthenticated);
    window.location.reload();
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between bg-neutral-200 p-2">
        <img
          src="/logo.png"
          className="w-10 h-10 cursor-pointer"
          alt=""
          onClick={() => navigate("/")}
        />
        <span>
          {PB.authStore.model?.avatar ? (
            <img
              src={`${BASE_File_URL}/${PB.authStore.model?.collectionId}/${PB.authStore.model?.id}/${PB.authStore.model?.avatar}`}
              className="w-10 h-10 rounded-full cursor-pointer object-cover ring-2 ring-blue-500"
              alt=""
              onClick={() => setShowMenu(!showMenu)}
            />
          ) : (
            <MdPerson
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
              size={24}
            />
          )}
          <div
            className={`${
              showMenu ? "flex" : "hidden"
            } absolute top-6 right-6 rounded-md bg-white p-2 w-48 flex-col gap-2`}
          >
            <button className="flex items-center p-2 bg-neutral-300 rounded-lg">
              <MdPerson size={18} />
              <p>See Profile</p>
            </button>
            <button
              onClick={() => logout()}
              className="flex items-center p-2 bg-neutral-300 rounded-lg"
            >
              <MdLogout size={18} />
              <p>Logout</p>
            </button>

            <button
              onClick={() => setShowMenu(false)}
              className="flex items-center p-2 bg-neutral-300 rounded-lg"
            >
              <MdClose size={18} />
              <p>Close</p>
            </button>
          </div>
        </span>
      </div>
    </nav>
  );
}

export default Header;
