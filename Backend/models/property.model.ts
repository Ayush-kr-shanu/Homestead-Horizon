import mongoose, { Schema, Document, Model } from 'mongoose';
import { IHost } from './host.model'; 
import { IBooking } from './booking.model';

// Interface for Property document
export interface IProperty extends Document {
  name: string;
  image:string;
  price:number
  city: string;
  type: string;
  years: Date;
  booked:boolean;
  active: boolean;
  host: IHost | mongoose.Types.ObjectId; // Reference to the _id field of the Host document
  bookings: IBooking['_id'][];
}

// Define the Property schema
const propertySchema: Schema<IProperty> = new Schema<IProperty>({
  name: { type: String, required: true },
  image:{ type: String, required: true },
  price:{ type: Number, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  years: { type: Date, default: Date.now },
  booked:{ type: Boolean, default: false },
  active: { type: Boolean, default: true },
  host: { type: Schema.Types.ObjectId, ref: 'Host' }, // Reference to the Host model
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

// Create and export the Property model
const PropertyModel: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default PropertyModel;
