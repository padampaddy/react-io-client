import React from "react";
import useSession from "./use-session";

const Login = () => {
  const setToken = useSession((state) => state.setToken);
  return (
    <form
      onSubmit={async (e) => {
        const form = new FormData(e.currentTarget);
        e.preventDefault();
        const data = await (
          await fetch("http://localhost:3000/auth/login", {
            body: JSON.stringify({
              email: form.get("email"),
              password: form.get("password"),
            }),
            headers: {
              "Content-type": "application/json",
            },
            method: "post",
          })
        ).json();
        setToken(data.accessToken);
      }}
    >
      <input name="email" />
      <input name="password" />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
