import React, { createContext, useContext, useEffect, useState } from "react";
import { useMagic } from "../components/auth/magic/MagicContext";

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
  const [loading, setLoading] = useState<boolean>(true);

  const { magic } = useMagic();

  useEffect(() => {
    const fetchData = async () => {
      if (!magic) return console.error("Magic not initialized");
      try {
        console.log("Fetching user metadata");

        setLoading(true);
        const m = await magic.user.getMetadata();
        setAddress(m.publicAddress!);
        setToken(localStorage.getItem("token")!);

        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [magic, setAddress, setToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, setToken, setAddress, address }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
