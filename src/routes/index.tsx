import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthRoutes } from "@/features/auth";
import { Layout } from "@/layouts";
import { Home, PageNotFound } from "@/pages";

import { RequireAuth } from "./components/RequireAuth";
import { mainEndpoints } from "./endpoints";

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            path={mainEndpoints.HOME_PAGE}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path={`${mainEndpoints.AUTH_PAGE}/*`}
            element={<AuthRoutes />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
