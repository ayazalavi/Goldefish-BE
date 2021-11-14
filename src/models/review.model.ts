import { model, Schema, Document } from "mongoose";
import { review, reviewModel } from "@/interfaces/review.interface";

const schema = new Schema<review, reviewModel>({
	hiredBy: { type: Schema.Types.ObjectId, ref: "USER"},
	jobTitle: { type:String, required: true},
	comments: { type:String, required: true},
	rating: { type:Number, min:0, max:5, required: true},
}, { timestamps: true });

const ReviewModel = model<review & Document>("REVIEW", schema);

export default ReviewModel;