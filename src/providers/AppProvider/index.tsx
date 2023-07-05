import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";

import { AuthProvider } from "@/features/auth";
import { configureAmplify } from "@/lib/aws";
import { ToastContainer } from "@/lib/chakra";
import { queryClient } from "@/lib/react-query";

import { ErrorFallback } from "./ErrorFallback";

configureAmplify();

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ChakraProvider resetCSS>
              <ToastContainer />
              <AuthProvider>{children}</AuthProvider>
            </ChakraProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
