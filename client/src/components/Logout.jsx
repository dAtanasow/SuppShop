import { useEffect } from "react";
import { useLogout } from "../hooks/useAuth";

export default function Logout() {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
