import { Navigate, useLocation } from "react-router-dom";

import { toSignInPage, useAuthentication } from "@/features/auth";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthentication();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={toSignInPage()} state={{ from: location }} replace />;
  }

  return children;
};
