import { authEndpoints, mainEndpoints } from "@/routes/endpoints";

export const toSignInPage = () =>
  `/${mainEndpoints.AUTH_PAGE}/${authEndpoints.SIGN_IN_PAGE}`;

export const toSignUpPage = () =>
  `/${mainEndpoints.AUTH_PAGE}/${authEndpoints.SIGN_UP_PAGE}`;

export const toConfirmSignUpPage = () =>
  `/${mainEndpoints.AUTH_PAGE}/${authEndpoints.CONFIRM_SIGN_UP}`;
