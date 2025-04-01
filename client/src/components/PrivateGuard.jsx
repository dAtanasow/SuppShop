import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PrivateGuard() {
  const { isAuthenticate } = useAuthContext();

  if (!isAuthenticate) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
