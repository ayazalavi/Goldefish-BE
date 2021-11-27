import { model, Schema } from "mongoose";

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "USER" },
    title: { type: String, required: true, index: true },
    photoURI: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "READTALK" }],
    type: { type: String, required: true, enum: ['Photo', " Video", "Audio"] },
    contentURI: { type: String, required: true },
    keywords: { type: [String], index: true},
    emojis: [{ type: Map, of: String }],
    filters: [{ type: Map, of: String }],
}, { timestamps: true });

const mymodel = model("READTALK", schema);

mymodel.ensureIndexes(function (err) {
	if (err) console.log(err);
});

mymodel.on("index", function (err) {
	console.log("indexing readtalks");
	if (err) console.error(err);
});

export default mymodel;