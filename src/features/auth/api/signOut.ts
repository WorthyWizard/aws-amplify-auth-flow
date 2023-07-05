import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Auth } from "aws-amplify";

import { authQueryKeys } from "./queryKeys";

export const signOut = () => {
  return Auth.signOut();
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData([authQueryKeys.USER], null);
    },
  });
};
