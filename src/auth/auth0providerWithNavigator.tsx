import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigator = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || "dev-example.auth0.com";
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "dev-client-id";
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI || "http://localhost:5173/auth-callback";
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || "https://dev-api.example.com";

  // For development, if environment variables are not set, render children without Auth0
  if (!import.meta.env.VITE_AUTH0_DOMAIN || !import.meta.env.VITE_AUTH0_CLIENT_ID) {
    console.warn("Auth0 environment variables not found. Running without authentication for development.");
    return <>{children}</>;
  }

  const onRedirectCallback = (appState?:AppState) => {
    navigate(appState?.returnTo||"/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigator;

