import jwt from 'jsonwebtoken';
import dotenv, { config } from 'dotenv';

dotenv.config();


export const verifyToken =async (req ,res ,next) =>{
     
    const token = await req.cookies.access_cookie;
    console.log("Token from cookies:", token);

    if (!token) {
        console.log("No token provided");

        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        req.token = token ;
        next();
      } catch (error) {
        console.log("Invalid token", error);

        res.status(400).json({ message: 'Invalid token.'});
      }

    }