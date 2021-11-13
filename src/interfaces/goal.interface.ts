import { Model, ObjectId } from "mongoose";

export interface Pick {
  _id: string;
  user: ObjectId;
  photoURI: string;
  title: string;
  author: string;
  genre: ObjectId;
  description: string;
  numberOfPages: number;
  daysToComplete: number;
}


export interface PickModel extends Model<Pick> {
	
}