import { logout, saveToken } from "../../../utils/comman";
import { useMagic } from "./MagicContext";

interface Props {
  setLoading: (loading: boolean) => void;
  setToken?: (token: string) => void;
  email: string;
}
const useMagicLogin = () => {
  const { magic } = useMagic();
  const handleOnLogin = async ({ setLoading, setToken, email }: Props) => {
    if (!magic) return console.error("Magic not initialized");
    try {
      setLoading(true);
      const token = await magic?.auth.loginWithEmailOTP({ email });
      console.log("Magic Connect Token", token);

      saveToken(token!, "EMAIL");
      setToken && setToken(token!);
      return magic;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!magic) return console.error("Magic not initialized");
    try {
      await logout(magic);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleOnLogin, handleDisconnect };
};

export default useMagicLogin;
