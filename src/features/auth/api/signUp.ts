import { useMutation } from "@tanstack/react-query";
import { Auth } from "aws-amplify";

import {
  ConfirmSignUpCredentials,
  ResendConfirmationCode,
  SignInCredentials,
} from "../types";

export const signUp = (credentials: SignInCredentials) => {
  const { email, password } = credentials;

  return Auth.signUp({
    username: email,
    password,
  });
};

export const confirmSignUp = ({ username, code }: ConfirmSignUpCredentials) => {
  return Auth.confirmSignUp(username, code);
};

export const resendConfirmationCode = ({
  username,
}: ResendConfirmationCode) => {
  return Auth.resendSignUp(username);
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useConfirmSignUp = () => {
  return useMutation({
    mutationFn: confirmSignUp,
  });
};

export const useResendConfirmationCode = () => {
  return useMutation({
    mutationFn: resendConfirmationCode,
  });
};
