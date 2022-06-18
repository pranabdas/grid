// https://ui.dev/react-router-protected-routes-authentication
import { Navigate } from "react-router-dom";
import { useSession } from "../auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useSession();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
