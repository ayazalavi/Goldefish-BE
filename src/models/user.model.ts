import { model, Schema, Document, Model } from "mongoose";
import { User, UserModel } from "@interfaces/users.interface";
import { AccountTypes } from "@/interfaces/accountTypes.interface";

const experienceOrAwards = new Schema<User, UserModel>({
	title: String,
	location: String,
	date: Date
});

const talentExperience = new Schema<User, UserModel>({
	employer: String,
	title: String,
	dateOfEmployment: Date
});

const seeking = new Schema<User, UserModel>({
	typeofBusiness: String,
	businessTitle: String,
	description: String,
	categories: [String],
	experienceOrAwards: [experienceOrAwards]
});

const talent = new Schema<User, UserModel>({
	title: String,
	description: String,
	categories: [String],
});

const review = new Schema<User, UserModel>({
	hiredBy: String,
	jobTitle: String,
	comments: String,
	rating: Number
});

const showcase = new Schema<User, UserModel>({
	talents: [talent],
	businessName: String,
	bio: String,
	fullname: String,
	talentExperience: [talentExperience],
	reviews: [review]
});

const schema = new Schema<User, UserModel>({
	photo: { type: String, required: false },
	background: { type: String, required: false },
	name: {
		fullName: { type: String, required: true },
		displayOnProfile: { type: Boolean, default: true }
	},
	username: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	accountType: { type: String, enum: Object.values(AccountTypes), required: true },
	location: {
		city: {type: String, required: true},
		country: {type: String, required: true},
		coordinates: { type: [Number], index: '2dsphere', required: false },
		displayOnProfile: { type: Boolean, default: true }
	},
	seekingTalent: seeking,
	showcaseTalent: showcase,
	tags: [String],
	phone: { type: String, required: false },
	dateOfBirth: {
		date: { type: Date, required: true },
		displayOnProfile: { type: Boolean, default: true }
	},
	friends: [{ type: Schema.Types.ObjectId, ref: "USER" }],
	subscribtions: [{ type: Schema.Types.ObjectId, ref: "USER" }],
	notifications: {
		postInteractions: { type: Boolean, default: false },
		friendRequests: { type: Boolean, default: true },
		messages: { type: Boolean, default: true },
	},
	security: {
		age: { type: Boolean, default: true },
		location: { type: Boolean, default: true },
		reviews: { type: Boolean, default: true },
	},
	blocked:[{type: Schema.Types.ObjectId, ref:"USER"}],
	socialMediaHandles: {
		type: Map,
		of: String,
		default: {},
		required: false
	}
}, { timestamps: true });

schema.pre(
	"validate", { document: true }, function (): void {
		console.log("pre validate");
	}
);

schema.pre("save", function (): void {
	console.log("pre save");
});

schema.statics.authenticateUser = async function (email: string, password: string) {
	
};

schema.statics.resetPassword = async function (code: string, password: string) {	

};

const userModel = model<User, UserModel>("USER", schema);

userModel.ensureIndexes(function (err) {
	if (err) console.log(err);
});

userModel.on("index", function (err) {
	console.log("indexing user");
	if (err) console.error(err);
});

export default userModel;
