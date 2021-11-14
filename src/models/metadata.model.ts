import { model, Schema, Document } from "mongoose";
import { MetaData } from "@/interfaces/metadata.interface";

const schema: Schema = new Schema({
    type: { type: String, enum:["category", "tag"], required: true},
    name: {type:String, required: true}
});

schema.index({ name: 1, type: -1 }, { unique: true });

const MetaDataModel = model<MetaData & Document>("METADATA", schema);

export default MetaDataModel;