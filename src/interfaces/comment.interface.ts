import { Model, ObjectId } from "mongoose";
import { Poll } from "./payment.interface";
import { PollAnswers } from "./post.interface";

export interface Discussion {
  _id: string;
  user: ObjectId
  title: string;
  description: string;
  poll: Poll;
  answers: Array<PollAnswers>;
  images: [string];
  tags: [string];
  likes: number;
  comments: [Comment],
}


export interface DiscussionModel extends Model<Discussion> {
	
}