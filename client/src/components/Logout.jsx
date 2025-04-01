import { useEffect } from "react";
import { useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await logout();
      navigate("/");
    };

    logoutAndRedirect();
  }, [logout, navigate]);

  return null;
}
