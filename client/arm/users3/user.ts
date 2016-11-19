export class User {
  id: number;
  _id: string;
  username: string; //no camel case for user name. as set in database.
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  location: string;
}

export class UserCredentials {
  userName: string;
  password: string;
  email: string;
}
