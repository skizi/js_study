import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <button
      variant="outline-primary"
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Log out
    </button>
  ) : (
    <button onClick={loginWithRedirect}>Log in</button>
  );
}

export default LoginButton;
