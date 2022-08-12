export enum ErrorTypes {
  emptyFields = 'emptyFields',
  invalidEmail = 'invalidEmail',
  passwordLength = 'passwordLength',
  incorrectLogin = 'incorrectLogin',
  emptyAuth = 'emptyAuth',
  equalTeams = 'equalTeams',
  teamDontExist = 'teamDontExist',
  invalidToken = 'invalidToken',
}

type ErrorResponseObj = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObj
};

export const errorCatalog: ErrorCatalog = {
  emptyFields: {
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
  emptyAuth: {
    message: 'Authorization must be filled',
    httpStatus: 400,
  },
  equalTeams: {
    message: 'It is not possible to create a match with two equal teams',
    httpStatus: 401,
  },
  teamDontExist: {
    message: 'There is no team with such id!',
    httpStatus: 404,
  },
  invalidToken: {
    message: 'Token must be a valid token',
    httpStatus: 401,
  },
};
