import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HostModel, { IHost } from '../models/host.model';
import PropertyModel, { IProperty } from '../models/property.model';
import BookingModel, { IBooking } from '../models/booking.model';
import { AuthMiddleware } from '../middlewares/auth';

const hostRoutes = express.Router();

//Auth to profile routes starts------------------------
hostRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, location } = req.body;

    const hostExist: IHost | null = await HostModel.findOne({ email });

    if (hostExist) {
      return res.status(400).send({ msg: `User already registered with this ${email}` });
    } else if (!name || !email || !password || !location) {
      return res.status(400).send({ msg: 'Please provide all details' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const host = new HostModel({ name, email, password: hashedPass, location });
    await host.save();

    return res.status(201).send({ msg: 'Host registered successfully', host });
  } catch (err:any) {
    return res.status(500).send({ msg: 'Something went wrong in registering host', error: err.message });
  }
});

hostRoutes.post("/login",async (req:Request, res:Response) => {
    try {
        const {email, password}=req.body

        if (!email || !password) {
            return res.status(400).send({ msg: 'Please Provide All The Details correctly' })
          }
        
        const host=await HostModel.findOne({email})

        if(!host){
            return res.status(400).send({ msg: "Invalid username and password" });
        }

        const passwordMatch = await bcrypt.compare(password, host.password);

        if (!passwordMatch) {
            return res.status(400).send({ msg: "Invalid username or password" });
        }
        const acessToken = jwt.sign({ userID: host._id, status: host.active, role: host.role, email: host.email }, process.env.JWT_SECRET_KEY as string, 
        {
            expiresIn: "1 day",
        });

        return res.status(200).send({ msg: "login successful", userID: host._id, name: host.name, email: host.email, acessToken, role: 'Host' });
    } catch (err) {
        return res.status(500).send({ msg: "something went wrong in logging user", error: err.message });
    }
})

hostRoutes.get('/profile/:id', AuthMiddleware, async (req, res) => {
  try {
    const hostId = req.params.id;
    const host = await HostModel.findById(hostId);
    if (!host) {
      return res.status(404).json({ error: 'Host not found.' });
    }
    res.json(host);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve host information.' });
  }
});


hostRoutes.put('/profile/:id', AuthMiddleware, async (req, res) => {
  try {
    const hostId = req.params.id;
    const updatedHostData: IHost = req.body; // Assuming request body contains the updated host data

    // If the request body contains a new password, hash it before updating the host data
    if (updatedHostData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(updatedHostData.password, salt);
      updatedHostData.password = hashedPass;
    }

    const updatedHost = await HostModel.findByIdAndUpdate(hostId, updatedHostData, { new: true });
    if (!updatedHost) {
      return res.status(404).json({ error: 'Host not found.' });
    }
    res.json(updatedHost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update host information.' });
  }
});
//Auth to profile routes ends here----------------------------


hostRoutes.get('/properties', AuthMiddleware, async (req: Request, res: Response) => {
  try {
    const hostId = req.body.userID; // Access the hostId from the request object
    // console.log(hostId);
    const properties = await PropertyModel.find({ host: hostId });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve properties.' });
  }
});

//Route to add property
hostRoutes.post('/properties', AuthMiddleware, async (req, res) => {
  try {
    // Assuming request body contains the necessary property data and the hostId of the corresponding host
    const { userID } = req.body;
    const host = await HostModel.findById(userID);
    if (!host) {
      return res.status(404).json({ error: 'Host not found.' });
    }
    const propertyData = {
      name: req.body.name,
      image: req.body.image,
      price:req.body.price,
      city: req.body.city,
      type: req.body.type,
      host: req.body.userID,
    };
    const createdProperty = await PropertyModel.create(propertyData);

    // Associate the property with the host by adding the property's ID to the host's properties array
    host.properties.push(createdProperty._id);
    await host.save();

    res.status(201).json(createdProperty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add a new property.' });
  }
});

// Route to update an existing property
hostRoutes.put('/properties/:propertyId', AuthMiddleware, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const updatedPropertyData = req.body; // Assuming request body contains the updated property data
    const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyId, updatedPropertyData, { new: true });
    if (!updatedProperty) {
      return res.status(404).json({ error: 'Property not found.' });
    }
    res.json(updatedProperty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the property.' });
  }
});

//Route to remove a property
hostRoutes.delete('/properties/:propertyId', AuthMiddleware, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ error: 'Property not found.' });
    }
    res.json({ message: 'Property deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the property.' });
  }
});

//all booking on property
hostRoutes.get('/property/booking', AuthMiddleware, async (req, res) => {
  try {
    const hostId = req.body.hostId;
    const bookings = await BookingModel.find({ 'property.host': hostId }).populate('property', 'name city').populate('guest', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});

hostRoutes.put('/bookings/:bookingId', AuthMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const updatedBookingData: IBooking = req.body; // Assuming request body contains the updated booking data
    const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, updatedBookingData, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to manage and confirm booking.' });
  }
});

export default hostRoutes;
