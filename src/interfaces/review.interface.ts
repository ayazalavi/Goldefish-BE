import { Model, ObjectId } from "mongoose";

export interface review {
  _id: string;
  hiredBy: ObjectId;
  jobTitle: string;
	comments: string;
  rating: number;
}

export interface reviewModel extends Model<review> {
}
