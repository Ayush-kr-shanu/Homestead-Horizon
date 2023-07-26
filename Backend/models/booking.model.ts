import mongoose, { Schema, Document, Model } from 'mongoose';
import { IProperty } from './property.model';
import { IGuest } from './guest.model';

export interface IBooking extends Document {
  property: IProperty | mongoose.Types.ObjectId;
  guest: IGuest | mongoose.Types.ObjectId;
  fromDate: Date;
  toDate: Date;
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>({
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true }, // Reference to the Property model
  guest: { type: Schema.Types.ObjectId, ref: 'Guest', required: true }, // Reference to the Guest model
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
});

const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', bookingSchema);

export default BookingModel;
