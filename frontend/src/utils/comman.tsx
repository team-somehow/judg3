import { Magic } from "../components/auth/magic/MagicContext";

export type LoginMethod = "EMAIL" | "SMS" | "SOCIAL" | "FORM" | "DYNAMIC";
export const logout = async (magic: Magic | null) => {
  if (await magic?.user.isLoggedIn()) {
    await magic?.user.logout();
  }
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthLoading");
  localStorage.removeItem("loginMethod");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("hussainToken");
};

export const saveToken = (token: string, loginMethod: LoginMethod) => {
  localStorage.setItem("token", token);
  localStorage.setItem("isAuthLoading", "false");
  localStorage.setItem("loginMethod", loginMethod);
};
