import { Navigate } from "react-router-dom";

import { toSignInPage, useAuthentication } from "@/features/auth";

export const PageNotFound = () => {
  const { isAuthenticated, isLoading, isInitialLoading } = useAuthentication();

  if (!isAuthenticated && !isLoading && !isInitialLoading)
    return <Navigate to={toSignInPage()} replace />;

  return <div style={{ fontSize: 40 }}>404</div>;
};
