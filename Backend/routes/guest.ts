import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import GuestModel, { IGuest } from '../models/guest.model';

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

export default guestRoutes;
