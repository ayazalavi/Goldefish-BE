import { Document, Model, ObjectId } from "mongoose";
import { AccountTypes } from "./accounttypes.interface";
import { review } from "./review.interface";

export interface name {
  fullName: string;
  displayOnProfile: boolean;
}

export interface location {
  city: string;
	country: string;
  coordinates: [number];
  displayOnProfile: boolean;
}

export interface dateOfBirth {
  date: Date;
  displayOnProfile: boolean;
}

export interface talentItem {
  title: string;
  description: string;
  category: ObjectId;
}

export interface experience {
  employer: string;
  title: string;
  dateOfEmployment: Date;
}

export interface talent {
  talents: [talentItem],
  fullname: string;
  profileBio: string;
	experience: [experience]
}

export interface businessItem {
  typeOfBusiness: string;
	title: string;
	description: string;
  category: ObjectId;
}

export interface award {
  title: string;
	location: string;
  date: Date;
}

export interface seeking {
  businessDetails: [businessItem],
  businessName: string;
  profileBio: string;
	awards: [award],
	talentInterests: [ObjectId]
}

export interface notification {
  postInteractions: boolean;
  friendRequests: boolean;
  messages: boolean;
}

export interface security {
  age: boolean;
  location: boolean;
  reviews: boolean;
}

export interface settings {
  notificationSettings: notification,
  securitySettings: security;
	blocked:[ObjectId],
}

export interface user extends Document {
  _id?: string;
  photo: string;
  background: string;
  name: name;
  username: string;
	email: string;
  password?: string;
  accountType: AccountTypes;  
  location: location;
  dateOfBirth: dateOfBirth;
  showcaseTalent: talent;
  seekingTalent: seeking;
  tags: Array<ObjectId>;
  friends: Array<ObjectId>;
  subscribtions: Array<ObjectId>;
  reviews: Array<review>;
  phone: string;
  settings: settings;
  socialMediaHandles: Map<string, string>;
  isEmailVerified: boolean;
  verificationCode?: string;
}


export interface userModel extends Model<user> {
	// authenticateUser: (email: string, password: string) => user;
	// resetPassword: (code: string, password: string) => user;
}
