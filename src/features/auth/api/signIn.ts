import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";

import { SignInCredentials } from "../types";

import { authQueryKeys } from "./queryKeys";

export const signIn = (credentials: SignInCredentials) => {
  const { email, password } = credentials;

  return Auth.signIn({
    username: email,
    password,
  });
};

export const signInWithGoogle = () => {
  return Auth.federatedSignIn({ customProvider: "Google" });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authQueryKeys.USER] });
    },
  });
};

export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authQueryKeys.USER] });
    },
  });
};
