import { JwtPayload } from "jsonwebtoken";
import IUser from '../../database/interfaces/iUser';

export const userToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJkYXRhIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTY1ODM2MTA1MCwiZXhwIjoxNjU4MzY0NjUwfQ
.3bJacQyGFtiOTmZ4E17mxdEUd1i-BjndU8R75sY610Q`;

export const userLogin = { email: 'string', password: 'string' };

export const roleMock: string = 'user';

export const payloadMock: JwtPayload = { data: 'admin@admin.com', iat: 1658404429, exp: 1658447629 };

// export const foundUser: IUser = {
//   id: 1,
//   username: 'Admin',
//   role: 'admin',
//   email: 'admin@admin.com',
//   password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
// };