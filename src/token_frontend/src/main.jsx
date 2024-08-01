import React from "react";
import ReactDOM from "react-dom/client";
import { AuthClient } from "@dfinity/auth-client";
import App from "./components/App";
import "./index.scss";

const init = async () => {
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()) {
    handleAuthentication(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => {
        handleAuthentication(authClient);
      },
    });
  }
};

async function handleAuthentication(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App loggedInPrincipal={userPrincipal} />
    </React.StrictMode>
  );
}

init();
