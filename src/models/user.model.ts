import { model, Schema } from "mongoose";
import { award, businessItem, experience, seeking, settings, talent, talentItem, user, userModel } from "@/interfaces/user.interface";
import { AccountTypes } from "@/enum/accounttypes.enum";

const Award = new Schema<award>({
	title: {type: String, required: true},
	location: {type: String, required: true},
	date: {type: Date, required: true},
});

const Experience = new Schema<experience>({
	employer: {type: String, required: true},
	title: {type: String, required: true},
	dateOfEmployment: {type: Date, required: true}
});

const BusinessItem = new Schema<businessItem>({
	typeOfBusiness: {type: String, required: true},
	title: { type: String, required: true },
	description: {type: String, required: true},
	category: {type: Schema.Types.ObjectId, ref:"METADATA"},
});

const Seeking = new Schema<seeking>({
	businessDetails: [BusinessItem],
	businessName: String,
	profileBio: String,
	awards: [Award],
	talentInterests: [{type: Schema.Types.ObjectId, ref:"METADATA"}]
});

const TalentItem = new Schema<talentItem>({
	title: {type: String, required: true},
	description: {type: String, required: true},
	category: {type: Schema.Types.ObjectId, ref:"METADATA"},
});

const Talent = new Schema<talent>({
	talents: [TalentItem],
	fullname: {type: String, required: true},
	profileBio : {type: String, required: true},	
	experience: [Experience]
});

const Settings = new Schema<settings>({
	notificationSettings: {
		postInteractions: { type: Boolean, default: false },
		friendRequests: { type: Boolean, default: true },
		messages: { type: Boolean, default: true },
	},
	securitySettings: {
		age: { type: Boolean, default: true },
		location: { type: Boolean, default: true },
		reviews: { type: Boolean, default: true },
	},
	blocked: {
		type: [Schema.Types.ObjectId],
		ref: "USER",
		default: [],
		required: true
	},
});

const schema = new Schema<user, userModel>({
	photo: { type: String, required: false },
	background: { type: String, required: false },
	name: {
		fullName: { type: String, required: false, index: true },
		displayOnProfile: { type: Boolean, default: true }
	},
	username: { type: String, required: true, unique: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: false },
	isEmailVerified: { type: Boolean, default: false},
	verificationCode: { type: String, required: true},
	accountType: { type: String, enum: Object.values(AccountTypes), required: false, index: true },
	location: {
		city: {type: String, required: false},
		country: {type: String, required: false},
		displayOnProfile: { type: Boolean, default: true }
	},
	dateOfBirth: {
		date: { type: Date, required: false },
		displayOnProfile: { type: Boolean, default: true }
	},
	showcaseTalent: {type: Talent, required: false},
	seekingTalent: {type: Seeking, required: false},
	tags: [{ type: Schema.Types.ObjectId, ref:"METADATA"}],
	friends: [{ type: Schema.Types.ObjectId, ref: "USER" }],
	subscribtions: [{ type: Schema.Types.ObjectId, ref: "USER" }],
	reviews: [{type:Schema.Types.ObjectId, ref:"REVIEW"}],
	phone: { type: String, required: false, index: true },
	settings: {type: Settings, required: false},
	socialMediaHandles: {
		type: Map,
		of: String,
		required: false,
		index: true
	}
}, { timestamps: true });

schema.index({ username: 1, email: -1 });

schema.pre(
	"validate", { document: true }, function (): void {
		console.log("pre validate");
	}
);

schema.pre("save", function (): void {
	console.log("pre save");
});

const userModel = model<user, userModel>("USER", schema);

userModel.createIndexes(function (err) {
	console.log("indexing user");
	if (err) console.log(err);
});

userModel.on("index", function (err) {
	if (err) console.error(err);
});

export default userModel;
