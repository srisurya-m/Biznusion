import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/types";

interface props {
  isAuthenticated?: boolean;
  children?: ReactElement;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
  user?: User;
  userRoute?: boolean;
}

const ProtectedRoute = ({
  isAuthenticated,
  user,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
  userRoute,
}: props) => {
  if (isAuthenticated === false) {
    if (user?.credentialPublicKey) {
      return <Navigate to={redirect} />;
    }
  }
  if (isAuthenticated) {
    if (user) {
      if (user.credentialPublicKey) {
        return <Navigate to={redirect} />;
      }
    }
  }
  if (adminRoute && !isAdmin) return <Navigate to={redirect} />;

  if (userRoute && !user) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
