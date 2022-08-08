export enum ErrorTypes {
  emptyEmail = 'emptyEmail',
  invalidEmail = 'invalidEmail',
  passwordLength = 'passwordLength',
  incorrectLogin = 'incorrectLogin',
  // InvalidToken = 'InvalidToken',
}

type ErrorResponseObj = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObj
};

export const errorCatalog: ErrorCatalog = {
  emptyEmail: {
    message: 'All fields must be filled',
    httpStatus: 400,
  },
  invalidEmail: {
    message: 'Invalid email',
    httpStatus: 401,
  },
  passwordLength: {
    message: '"Password" must have at least 6 characters',
    httpStatus: 401,
  },
  incorrectLogin: {
    message: 'Incorrect email or password',
    httpStatus: 401,
  },
};
