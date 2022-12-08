// src/App.jsx
import React from "react";
import Client from "./Client";
import Login from "./Login";
import useSession from "./use-session";
export const App = () => {
  const token = useSession((state) => state.token);
  return <div>{token ? <Client /> : <Login />}</div>;
};
