import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { PageNotFound } from "@/pages";
import { authEndpoints, mainEndpoints } from "@/routes/endpoints";
import { LocationState } from "@/routes/types";

import { useAuthentication } from "../providers/AuthProvider";

import { ConfirmSignUp } from "./ConfirmSignUp";
import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";

export const AuthRoutes = () => {
  const { isAuthenticated } = useAuthentication();

  const location = useLocation();
  const locationState = location.state as LocationState | null;

  if (isAuthenticated) {
    if (locationState && locationState?.from)
      return <Navigate to={locationState.from.pathname} />;

    return <Navigate to={`/${mainEndpoints.HOME_PAGE}`} />;
  }

  return (
    <Routes>
      <Route
        index
        element={<Navigate replace to={authEndpoints.SIGN_IN_PAGE} />}
      />
      <Route path={authEndpoints.SIGN_IN_PAGE} element={<SignInPage />} />
      <Route path={authEndpoints.SIGN_UP_PAGE} element={<SignUpPage />} />
      <Route path={authEndpoints.CONFIRM_SIGN_UP} element={<ConfirmSignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
