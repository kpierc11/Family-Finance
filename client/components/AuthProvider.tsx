import { createContext, useState } from "react";

interface AuthProps {
  userAuthenticated: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

export const AuthContext = createContext<AuthProps>({
  userAuthenticated: false,
  onLogout: function (): void {},
  onLogin: function (): void {},
});

export default function AuthProvider({ children }: any) {
  const [token, setToken] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const handleLogin = () => {
    setUserAuthenticated(true);
  };

  const handleLogout = () => {
    setToken("");
  };

  const value: AuthProps = {
    userAuthenticated: userAuthenticated,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
