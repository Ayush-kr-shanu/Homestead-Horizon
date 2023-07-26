import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface TokenPayload {
    userID: string;
    role : string;
    status : boolean;
    email : string;
}

const AuthMiddleware=async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const token=req.headers.authorization

        if(!token){
           return res.status(401).send({"msg": "login again"})
        }
        const decodeToken=jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload
        // console.log(decodeToken);

        const {userID, email, status, role}=decodeToken
        if(status){
            req.body.userID=userID
            req.body.status=status
            req.body.email=email
            req.body.role=role
            next()
            return
        }else{
            res.send({msg : "Your Account is currently disabled, Kindly contact the admin"})
        }
    } catch (err:any) {
        return res.status(401).json({ message: 'Unauthorized' ,err:err.message});
    }
}

export {AuthMiddleware}