import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Host document
export interface IHost extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  propertyType?: string;
  active: boolean;
}

// Define the Host schema
const hostSchema: Schema<IHost> = new Schema<IHost>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  propertyType: { type: String },
  active: { type: Boolean, default: true },
});

// Create and export the Host model
const HostModel: Model<IHost> = mongoose.model<IHost>('Host', hostSchema);

export default HostModel;
