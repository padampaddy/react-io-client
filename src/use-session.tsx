import create from "zustand";
import { io, Socket } from "socket.io-client";

export interface IState {
  token: string;
  setToken(arg0: string): void;
  socket?: Socket;
  connect(): void;
  sessionConnect(sessionId: string): void;
  sessionDisconnect(): void;
  isConnected: boolean;
  isSessionConnected: boolean;
  getROIs(): void;
  rois: unknown[];
}

const useSession = create<IState>((set, get) => {
  return {
    token: localStorage.getItem("token") ?? "",
    setToken: (token: string) => {
      localStorage.setItem("token", token);
      set({ token });
    },
    isSessionConnected: false,
    isConnected: false,
    socket: undefined,
    connect: () => {
      const socket = io("http://localhost:3000", {
        query: {
          token: get().token,
        },
      });
      socket.on("connect", () => {
        set({
          isConnected: true,
        });
      });
      socket.on("disconnect", () => {
        set({
          isConnected: false,
          isSessionConnected: false,
        });
      });
      set({
        socket,
      });
      socket.on("message", (message) => {
        console.log(message);
      });
    },
    sessionConnect: (sessionId) => {
      get().socket?.emit("session-connect", sessionId, (isSessionConnected) => {
        set({ isSessionConnected });
      });
    },
    sessionDisconnect: () => {
      get().socket?.emit("session-disconnect", null, () => {
        set({
          isSessionConnected: false,
          rois: [],
        });
      });
    },
    rois: [],
    getROIs: () => {
      get().socket?.emit("session-roi-get", null, (rois) => {
        set({
          rois,
        });
      });
    },
  };
});

export default useSession;
