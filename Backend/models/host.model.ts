import mongoose, { Schema, Document, Model } from 'mongoose';
import PropertyModel, { IProperty } from './property.model';

// Interface for Host document
export interface IHost extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  propertyType?: string;
  role?: string;
  active: boolean;
  properties: IProperty['_id'][]
}

// Define the Host schema
const hostSchema: Schema<IHost> = new Schema<IHost>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  propertyType: { type: String },
  role: { type: String, default: 'host'},
  active: { type: Boolean, default: true },
  properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
});


hostSchema.virtual('propertyList', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'host',
});

// Create and export the Host model
const HostModel: Model<IHost> = mongoose.model<IHost>('Host', hostSchema);

export default HostModel;
