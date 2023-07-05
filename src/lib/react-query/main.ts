import { DefaultOptions, QueryClient } from "@tanstack/react-query";

import { toast } from "../chakra";

import { messages } from "./messages";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
  mutations: {
    onError: (error: any) => {
      const errorMessage = error?.message ?? messages.error;

      toast({
        title: "Error",
        description: errorMessage,
        position: "bottom-right",
        status: "error",
        isClosable: true,
        containerStyle: {
          margin: "6",
        },
      });
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
