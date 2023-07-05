import { createContext, ReactNode, useContext, useMemo } from "react";

import { useUser } from "../api";

export interface AuthProviderValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
}

export const AuthContext = createContext<AuthProviderValue | undefined>(
  undefined
);

export const AuthProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const { data, isLoading, isInitialLoading } = useUser();

  const isAuthenticated = Boolean(data);

  const returnValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      isInitialLoading,
    }),
    [data, isLoading, isInitialLoading]
  );

  return (
    <AuthContext.Provider value={returnValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthentication = (): AuthProviderValue => {
  const value = useContext(AuthContext);

  if (value === undefined) {
    throw new Error("useAuthentication must be used within AuthProvider");
  }

  return value;
};
