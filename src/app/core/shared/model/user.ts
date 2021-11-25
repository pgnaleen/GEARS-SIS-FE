import {Role} from './roles';

export class User {
  id?: number;
  username?: string;
  email?: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  dob: string;
  phoneNo: string;
  token?: string;
}
