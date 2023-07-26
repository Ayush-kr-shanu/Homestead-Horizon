import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import GuestModel, { IGuest } from '../models/guest.model';
import BookingModel, { IBooking } from '../models/booking.model';
import PropertyModel from '../models/property.model';
import { AuthMiddleware } from '../middlewares/auth';

const guestRoutes = express.Router();

guestRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, gender } = req.body;

    const guestExist: IGuest | null = await GuestModel.findOne({ email });

    if (guestExist) {
      return res.status(400).send({ msg: `User already registered with this ${email}` });
    } else if (!name || !email || !password || !age || !gender) {
      return res.status(400).send({ msg: 'Please provide all details' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const guest = new GuestModel({ name, email, password: hashedPass, age, gender });
    await guest.save();

    return res.status(201).send({ msg: 'Guest registered successfully', guest });
  } catch (err: any) {
    return res.status(500).send({ msg: 'Something went wrong in registering guest', error: err.message });
  }
});

guestRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ msg: 'Please Provide All The Details correctly' });
    }

    const guest = await GuestModel.findOne({ email });

    if (!guest) {
      return res.status(400).send({ msg: 'Invalid username and password' });
    }

    const passwordMatch = await bcrypt.compare(password, guest.password);

    if (!passwordMatch) {
      return res.status(400).send({ msg: 'Invalid username or password' });
    }

    const accessToken = jwt.sign(
      { userID: guest._id, status: guest.active, role: 'Guest', email: guest.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1 day',
      }
    );

    return res
      .status(200)
      .send({ msg: 'Login successful', userID: guest._id, name: guest.name, email: guest.email, accessToken, role: 'Guest' });
  } catch (err) {
    return res.status(500).send({ msg: 'Something went wrong in logging user', error: err.message });
  }
});

guestRoutes.get('/profile/:id', AuthMiddleware, async (req, res) => {
  try {
    const guestId = req.params.id;
    const guest = await GuestModel.findById(guestId);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found.' });
    }
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve guest information.' });
  }
});

guestRoutes.put('/profile/:id', AuthMiddleware, async (req, res) => {
  try {
    const guestId = req.params.id;
    const updatedGuestData: IGuest = req.body; // Assuming request body contains the updated host data

    // If the request body contains a new password, hash it before updating the host data
    if (updatedGuestData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(updatedGuestData.password, salt);
      updatedGuestData.password = hashedPass;
    }

    const updatedGuest = await GuestModel.findByIdAndUpdate(guestId, updatedGuestData, { new: true });
    if (!updatedGuest) {
      return res.status(404).json({ error: 'Host not found.' });
    }
    res.json(updatedGuest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update host information.' });
  }
});



// Route to create a new booking
guestRoutes.post('/bookings', AuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { propertyId, fromDate, toDate } = req.body;
    const guestId = req.body.userID;

    // Check if the property and guest exist in the database
    const property = await PropertyModel.findById(propertyId);
    const guest = await GuestModel.findById(guestId);

    if (!property || !guest) {
      return res.status(404).json({ error: 'Property or guest not found.' });
    }

    // Check for overlapping bookings for the same property
    const existingBookings = await BookingModel.find({
      property: propertyId,
      fromDate: { $lt: toDate },
      toDate: { $gt: fromDate },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: 'The property is already booked for the requested date span.' });
    }

    // Create a new booking
    const booking: IBooking = new BookingModel({
      property: propertyId,
      guest: guestId,
      fromDate,
      toDate,
    });

    // Save the booking to the database
    await booking.save();

    // Update the 'booked' property of the corresponding property to true
    await PropertyModel.findByIdAndUpdate(propertyId, { booked: true });

    res.json({ message: 'Booking created successfully.', booking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking.' });
  }
});

// Route to cancel a booking
guestRoutes.delete('/bookings/:bookingId', AuthMiddleware, async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const guestId = req.body.userID;

    // Check if the booking exists and is associated with the logged-in guest
    const booking = await BookingModel.findById(bookingId);
    if (!booking || booking.guest.toString() !== guestId) {
      return res.status(404).json({ error: 'Booking not found or unauthorized.' });
    }

    // Remove the booking from the database
    await BookingModel.deleteOne({ _id: bookingId });

    // Update the 'booked' property of the corresponding property to false
    await PropertyModel.findByIdAndUpdate(booking.property, { booked: false });

    res.json({ message: 'Booking canceled successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel the booking.' });
  }
});


// Route to retrieve the booking history of a guest
guestRoutes.get('/bookings/history', AuthMiddleware, async (req, res) => {
  try {
    const guestId = req.body.userID;

    // Check if the guest exists in the database
    const guest = await GuestModel.findById(guestId);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found.' });
    }

    // Retrieve the booking history of the guest
    const bookings = await BookingModel.find({ guest: guestId }).populate('property', 'name image city price type years host');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve booking history.' });
  }
});

export default guestRoutes;
