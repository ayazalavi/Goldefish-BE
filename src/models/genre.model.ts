import { model, Schema, Document } from "mongoose";
import { Genre } from "@/interfaces/genre.interface";

const schema: Schema = new Schema({
    name: {type:String, required: true, unique: true}
});

const userModel = model<Genre & Document>("GENRE", schema);

export default userModel;