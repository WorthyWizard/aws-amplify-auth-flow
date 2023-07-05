import { useQuery } from "@tanstack/react-query";
import { Auth } from "aws-amplify";

import { authQueryKeys } from "./queryKeys";

export const getCurrentSession = () => {
  return Auth.currentSession();
};

export const getAuthenticatedUser = () => {
  return Auth.currentAuthenticatedUser();
};

export const useUser = () => {
  return useQuery({
    queryFn: getAuthenticatedUser,
    queryKey: [authQueryKeys.USER],
  });
};
