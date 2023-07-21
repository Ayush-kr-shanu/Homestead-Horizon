import mongoose from "mongoose";

require('dotenv').config();

const URL=process.env.URL as string

const connection = mongoose.connect(URL);

export default connection;