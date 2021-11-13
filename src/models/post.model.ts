import { Discussion, DiscussionModel } from "@/interfaces/comment.interface";
import { PickModel, Pick } from "@/interfaces/goal.interface";
import { ReadTalk, ReadTalkModel } from "@/interfaces/readtalk.interface";
import { model, Schema } from "mongoose";


const PollAnswers = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: "USER" }],
    option: [String]
});

const Poll = new Schema({
    question: String,
    options: [String]
});

const Comment = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "USER" },
    comment: {type: String, required: true, index: true},
    likes: { type: Number, default: 0 },
    media: { type: String, required: false},
}, { timestamps:true });

const schema = new Schema<Discussion, DiscussionModel>({
    user: { type: Schema.Types.ObjectId, ref: "USER", required: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true, index: true },
    poll: { type: Poll, required: false, default: undefined },
    answers: [PollAnswers],
    images: [String],
    tags: [{ type: String, index: true, required: false }],
    likes: {type: Number, default: 0},
    comments: [Comment],
}, { timestamps: true });

const mymodel = model<Discussion, DiscussionModel>("DISCUSSION", schema);

mymodel.ensureIndexes(function (err) {
	if (err) console.log(err);
});

mymodel.on("index", function (err) {
	console.log("indexing discussions");
	if (err) console.error(err);
});

export default mymodel;