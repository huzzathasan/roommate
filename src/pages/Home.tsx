import { IoIosCheckmarkCircle, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../store";
import NotAuthentic from "../components/NotAuthentic";
import Header from "../components/Header";
import { useEffect } from "react";
import { BASE_File_URL } from "../helper";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { fetchUsers, users } = useUser();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (!isAuthenticated) return <NotAuthentic />;
  return (
    <div className="w-full h-screen flex justify-center">
      <Header />
      <div
        className="pt-16 overflow-y-auto w-full lg:max-w-screen-md"
        id="main"
      >
        <div className="flex items-center bg-white p-2 mx-6 rounded-md">
          <IoIosSearch size={24} />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search a friend"
            className="flex-grow focus:outline-none"
          />
        </div>
        {users?.map((user) => (
          <div key={user.id} className="p-3 md:p-6">
            <div
              onClick={() => navigate(`/chat/${user.id}`)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {user.avatar !== "" ? (
                  <img
                    src={`${BASE_File_URL}/${user.collectionId}/${user.id}/${user.avatar}`}
                    alt=""
                    className="w-14 h-14 rounded-full ring-2 object-cover"
                  />
                ) : (
                  <img
                    src={"/defaultAvatar.png"}
                    alt=""
                    className="w-14 h-14 rounded-full ring-2 object-cover"
                  />
                )}
                <span>
                  {user.firstName ? (
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
                  ) : (
                    <h3>{user.username}</h3>
                  )}
                  <p>You: Lorem ipsum dolor sit amet.</p>
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h4>12:54 PM</h4>
                <p className="">
                  <IoIosCheckmarkCircle color="blue" />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
