import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HostModel, { IHost } from '../models/host.model';

const hostRoutes = express.Router();

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

export default hostRoutes;
