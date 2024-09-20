import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  address: string | null;
  setAddress: (address: string) => void;
};
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  address: null,
  setAddress: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components,
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, setAddress, address }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
