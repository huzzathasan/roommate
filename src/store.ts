import { create } from "zustand";
import PB from "./api/pocketbase.config";
import { MessageRecord, UserRecord } from "./types";
import { RecordFullListOptions, RecordOptions } from "pocketbase";

interface Auth {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuth = create<Auth>((set) => ({
  isAuthenticated: PB.authStore.isValid,
  setIsAuthenticated(isAuthenticated) {
    set({ isAuthenticated });
  },
}));

interface FetchMessages {
  messages: MessageRecord[];
  setMessages?: () => void;
  fetchMessages: (sender: string, receiver: string) => void;
  newMessage: (data: MessageRecord) => void;
  subscribeToMessage: (sender: string, receiver: string) => void;
}

export const useMessage = create<FetchMessages>((set) => ({
  messages: [],
  fetchMessages: async (sender: string, receiver: string) => {
    const response = await PB.collection("messages").getFullList({
      filter: `(sender='${sender}' && receiver='${receiver}') || (sender='${receiver}' && receiver='${sender}')`,
    });
    set({ messages: response as MessageRecord[] });
  },
  newMessage: async (data: MessageRecord) => {
    const response = await PB.collection("messages").create(data);
    set((state) => ({
      messages: [...state.messages, response as MessageRecord],
    }));
  },
  subscribeToMessage: (sender: string, receiver: string) => {
    PB.collection("messages").subscribe("*", (e) => {
      const newMessage = e.record as MessageRecord;
      if (
        (newMessage.sender === sender && newMessage.receiver === receiver) ||
        (newMessage.sender === receiver && newMessage.receiver === sender)
      ) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },
}));

interface FetchUser {
  users: UserRecord[];
  fetchUsers: (options?: RecordFullListOptions) => void;
  user?: UserRecord;
  fetchUser: (id: string, option?: RecordOptions) => void;
}

export const useUser = create<FetchUser>((set) => ({
  users: [],
  fetchUsers: async (options?: RecordFullListOptions) => {
    const response = await PB.collection("users").getFullList(options);
    set({ users: response as UserRecord[] });
  },
  fetchUser: async (id: string, options?: RecordOptions) => {
    const response = await PB.collection("users").getOne(id, options);
    set(() => ({ user: response as UserRecord }));
  },
}));
