import { useParams } from "react-router-dom";
import {
  IoIosAdd,
  IoIosArrowBack,
  IoIosCall,
  IoIosCamera,
  IoIosInformationCircle,
  IoIosSend,
  IoIosVideocam,
} from "react-icons/io";
import MessageBubble from "../components/MessageBubble";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth, useMessage, useUser } from "../store";
import PB from "../api/pocketbase.config";
import { MessageRecord } from "../types";
import { BASE_File_URL } from "../helper";

function Room() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { fetchMessages, messages, subscribeToMessage, newMessage } =
    useMessage();
  const navigate = useNavigate();
  const [data, setData] = useState<MessageRecord>({
    sender: PB.authStore.model!.id,
    receiver: id!,
    message: "",
    media: [],
  });
  const { fetchUser, user } = useUser();

  useEffect(() => {
    fetchUser(id!);
  }, [id, fetchUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchMessages(PB.authStore.model!.id, id!);
  }, [fetchMessages, id]);

  const sendMessage = () => {
    newMessage(data);
    subscribeToMessage(PB.authStore.model!.id, id!);
    setData({ ...data, message: "" });
    return () => {
      PB.collection("messages").unsubscribe("*");
    };
  };

  return (
    <div className="w-full h-screen flex flex-col lg:items-center">
      <div className="w-full lg:w-1/2 flex items-center justify-between py-2 bg-neutral-200">
        <div className="flex items-center gap-3">
          <button className="p-3 pr-2 " onClick={() => navigate("/")}>
            <IoIosArrowBack size={24} />
          </button>
          <img
            src={`${BASE_File_URL}/${user?.collectionId}/${user?.id}/${user?.avatar}`}
            className="w-12 h-12 rounded-full ring-1"
            alt=""
          />
          <span>
            <h3 className="font-medium">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm">Active Now</p>
          </span>
        </div>
        <div className="flex items-center">
          <button className="p-3">
            <IoIosCall size={24} />
          </button>
          <button className="p-3">
            <IoIosVideocam size={24} />
          </button>
          <button className="p-3">
            <IoIosInformationCircle size={24} />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex-grow overflow-y-auto p-3">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble message={message} key={message.id} />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p>No Message</p>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 flex items-center gap-2 p-1 bg-white ">
        <div className="flex items-center gap-1">
          <label
            htmlFor="file"
            className="p-2 bg-neutral-200 rounded-xl cursor-pointer"
          >
            <IoIosAdd size={24} />
          </label>
          <input type="file" id="file" hidden multiple />
          <label
            htmlFor="media"
            className="p-2 bg-neutral-200 rounded-xl cursor-pointer"
          >
            <IoIosCamera size={24} />
          </label>
          <input type="file" hidden multiple name="media" id="media" />
        </div>
        <input
          type="text"
          placeholder="Message..."
          value={data.message}
          className="flex-grow p-2 focus-within:outline-none bg-neutral-200 rounded-full"
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
        <button
          onClick={() => sendMessage()}
          className="p-2 bg-neutral-200 rounded-xl cursor-pointer"
        >
          <IoIosSend size={24} />
        </button>
      </div>
    </div>
  );
}

export default Room;
