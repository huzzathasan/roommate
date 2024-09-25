import React from "react";
import PB from "../api/pocketbase.config";
import { MessageRecord } from "../types";

export default function MessageBubble({ message }: { message: MessageRecord }) {
  const endMessageRef = React.useRef<HTMLDivElement | null>(null);
  const user = PB.authStore.model;
  React.useEffect(() => {
    endMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return (
    <div
      ref={endMessageRef}
      className={`w-full flex items-center my-2 ${
        user!.id === message.sender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] min-w-min w-max p-2 rounded-md ${
          user!.id === message.sender
            ? "rounded-ee-none bg-blue-400"
            : "rounded-es-none bg-neutral-100"
        }`}
      >
        <p
          className={`${
            user!.id === message.sender ? "text-white" : "text-black"
          }`}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
}
