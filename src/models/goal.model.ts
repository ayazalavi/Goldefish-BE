import { PickModel, Pick } from "@/interfaces/goal.interface";
import { model, Schema } from "mongoose";

const schema = new Schema<Pick, PickModel>({
    user: { type: Schema.Types.ObjectId, ref: "USER", required: true },
    photoURI: { type: String, required: true },
    title: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    genre: { type: Schema.Types.ObjectId, ref:"GENRE", required: true },
    description: { type: String, required: false },
    numberOfPages: { type: Number, required: true },
    daysToComplete: { type: Number, required: true},
}, { timestamps: true });

const mymodel = model<Pick, PickModel>("PICK", schema);

mymodel.ensureIndexes(function (err) {
	if (err) console.log(err);
});

mymodel.on("index", function (err) {
	console.log("indexing pick");
	if (err) console.error(err);
});

export default mymodel;