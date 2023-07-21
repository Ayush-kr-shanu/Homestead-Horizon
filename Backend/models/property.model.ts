import mongoose, { Schema, Document, Model } from 'mongoose';
import { IHost } from './host.model'; 

// Interface for Property document
export interface IProperty extends Document {
  name: string;
  city: string;
  type: string;
  years: Date;
  active: boolean;
  host: IHost['_id']; // Reference to the _id field of the Host document
}

// Define the Property schema
const propertySchema: Schema<IProperty> = new Schema<IProperty>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  years: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  host: { type: Schema.Types.ObjectId, ref: 'Host' }, // Reference to the Host model
});

// Create and export the Property model
const PropertyModel: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default PropertyModel;
