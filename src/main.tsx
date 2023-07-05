import ReactDOM from "react-dom/client";

import { AppProvider } from "./providers";
import { Router } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <Router />
  </AppProvider>
);
