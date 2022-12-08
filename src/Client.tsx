import React, { useEffect } from "react";
import useSession from "./use-session";

export default function Client() {
  const connect = useSession((state) => state.connect);
  const sessionConnect = useSession((state) => state.sessionConnect);
  const sessionDisconnect = useSession((state) => state.sessionDisconnect);
  const isConnected = useSession((state) => state.isConnected);
  const getROIs = useSession((state) => state.getROIs);
  const rois = useSession((state) => state.rois);
  const isSessionConnected = useSession((state) => state.isSessionConnected);
  useEffect(() => {
    connect();
  }, []);
  return (
    <div>
      <div>{isConnected ? "Connected" : "Not Connected"}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          if (!isSessionConnected)
            sessionConnect(form.get("sessionId") as string);
          else sessionDisconnect();
        }}
      >
        <input placeholder="Session Id" name="sessionId" />
        <button type="submit">
          {!isSessionConnected ? "Connect" : "Disconnect"}
        </button>
      </form>
      <div>
        {isSessionConnected ? "Session Connected" : "Session Not Connected"}
      </div>
      <div>
        <button
          onClick={() => {
            getROIs();
          }}
        >
          Get ROIs
        </button>
      </div>
      <div>{JSON.stringify(rois)}</div>
    </div>
  );
}
