import mongoose, { Schema, Document, Model } from 'mongoose';
import { IBooking } from './booking.model';

// Interface for Guest document
export interface IGuest extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  active: boolean;
  bookings: IBooking['_id'][];
}

// Define the Guest schema
const guestSchema: Schema<IGuest> = new Schema<IGuest>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  active: { type: Boolean, default: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

// Create and export the Guest model
const GuestModel: Model<IGuest> = mongoose.model<IGuest>('Guest', guestSchema);

export default GuestModel;
