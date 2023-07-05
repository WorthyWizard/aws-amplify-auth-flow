export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ConfirmSignUpCredentials {
  username: string;
  code: string;
}

export interface ResendConfirmationCode {
  username: string;
}
