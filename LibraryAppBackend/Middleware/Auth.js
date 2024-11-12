import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();
const secretKey=process.env.SecretKey;

const authMiddleware= async(req,res,next)=>{ 
    const cookies= req.headers.cookie;
    const cookie= cookies.split(';');

    console.log(cookie);
    
    for (let cooki of cookie) {
        const [name, token] = cooki.trim().split('=');

      if (name == "AuthToken"){
        const verify = jwt.verify(token,secretKey);
        console.log(verify)
      }
}
}
// // Authorization Middleware for Admin Only
// const authorizeAdmin = (req, res, next) => {
//     const { role } = req.user; // Assuming req.user is populated by the authenticate middleware
//     if (role === 'admin') {
//         return next(); // User is authorized as admin
//     }
//     return res.status(403).json({ message: "Access denied. Admins only." });
// };


export {authMiddleware,};