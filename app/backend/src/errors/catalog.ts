export enum ErrorTypes {
  EmptyEmail = 'EmptyEmail',
  InvalidEmail = 'InvalidEmail',
  PasswordLength = 'PasswordLength',
  IncorrectLogin = 'IncorrectLogin',
  // InvalidToken = 'InvalidToken',
};

type ErrorResponseObj = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObj
};

export const errorCatalog: ErrorCatalog = {
  EmptyEmail: {
    message: 'All fields must be filled',
    httpStatus: 400,
  },
  InvalidEmail: {
    message: 'Invalid email',
    httpStatus: 401,
  },
  PasswordLength: {
    message: '"Password" must have at least 6 characters',
    httpStatus: 401,
  },
  IncorrectLogin: {
    message: 'Incorrect email or password',
    httpStatus: 401,
  },
};