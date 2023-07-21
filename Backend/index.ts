import express from 'express'
import connection from './config/db'

const app=express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Home page")
})





app.listen(4500, async()=>{
  try {
    await connection
    console.log("Database is connected")
  } catch (err) {
    console.log("Error in db connection", err)
  }
  console.log("Port is live");
})