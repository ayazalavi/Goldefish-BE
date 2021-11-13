import { ObjectId } from "mongoose";

export interface PollAnswers {
  _id: string;
  users: [ObjectId];
  option: [string];
}