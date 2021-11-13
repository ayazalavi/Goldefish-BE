import { Model, ObjectId } from "mongoose";

export interface User {
  _id: string;
  photo: string;
	name: string;
	email: string;
	password: string;
  genres: Array<string>;
  clubs: Array<ObjectId>;
  location: {
    city: string,
    country: string,
    coordinates: number
  };
  bio: string;
  phone: string;
  gender: string;
  privacy: {
    phone: boolean,
    email: boolean,
    messages: boolean
  };
  blocked: Array<ObjectId>;
  socialMediaHandles: Map<string, string>;
}

export enum AccountTypes {
  SHOWCASE_TALENT="SHOWCASE_TALENT",
  SEEKING_TALENT="SEEKING_TALENT",
  FOR_FUN="FOR_FUN"
}


export interface UserModel extends Model<User> {
	authenticateUser: (email: string, password: string) => User;
	resetPassword: (code: string, password: string) => User;
}
