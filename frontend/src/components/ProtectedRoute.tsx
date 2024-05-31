import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/types";

interface props {
    isAuthenticated: boolean;
    children?: ReactElement;
    adminRoute?: boolean;
    isAdmin?: boolean;
    redirect?: string;
    user?: User;
  }

const ProtectedRoute = ({
    isAuthenticated,
    user,
    children,
    adminRoute,
    isAdmin,
    redirect = "/",
  }: props) => {
    if (!isAuthenticated){
      if(user?.credentialPublicKey) return <Navigate to={redirect} />
    }
    if(adminRoute && !isAdmin) return <Navigate to ={redirect}/> 
  return children ? children : <Outlet/>;
}

export default ProtectedRoute


