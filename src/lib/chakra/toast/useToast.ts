import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react";

export const useToast = (options?: UseToastOptions) => {
  return useChakraToast({
    position: "bottom-right",
    ...options,
  });
};
