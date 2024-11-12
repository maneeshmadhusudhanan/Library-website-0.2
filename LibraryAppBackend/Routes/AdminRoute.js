import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admins} from "../models/admin.model.js";
import { authMiddleware,} from "../Middleware/Auth.js";

dotenv.config();
const AdminRoute = Router();
const secretKey = process.env.SECRET_KEY || 'yourSecretKey';


AdminRoute.post('/Admin/signup', async (req, res) => {
    try {
        const { AdminName, Apassword } = req.body;
        
       
        const hashedPassword = await bcrypt.hash(Apassword, 10);

        
        const existingAdmin = await Admins.findOne({ AdminName: userName });
        if (existingAdmin) {
            return res.status(403).json({ message: "Admin already exists!" });
        }

        // Create new admin
        const newAdmin = new Admins({
            AdminName: userName,
            Apassword: hashedPassword,
            role: 'admin'
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin successfully registered!" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error during signup." });
    }
});

AdminRoute.post('/Admin/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Find admin by username
        const admin = await Admins.findOne({ AdminName: userName });
        if (!admin) {
            return res.status(403).json({ message: "Admin does not exist!" });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, admin.Apassword);
        if (!isValidPassword) {
            return res.status(403).json({ message: "Incorrect password!" });
        }

        // Generate token and set cookie
        const token = jwt.sign(
            { userName: admin.AdminName, userRole: admin.role },
            secretKey,
            { expiresIn: "1h" }
        );
        res.cookie('AuthToken', token, { httpOnly: true });
        res.status(200).json({ token, message: "Admin Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error during login." });
    }
});



AdminRoute.post('/addCourse', (req, res) => {
    const user = req.userrole;


    const { BookName, AutherName, Description, ChooseBook } = req.body;

    try {

        if (user == "admin") {
            try {
                if (course.get(BookName)) {
                    res.status(400).json({ message: "Book already present" })
                }
                else {
                    course.set(BookName, {
                        AutherName: CourseId,
                        Description: Description,
                        ChooseBook: ChooseBook,
                        
                    })

                    res.status(201).json({ message: "Book Details Uploaded" });
                    console.log(course.get(BookName));

                }
            }

            catch (error) {
                res.status(401).json({ message: "Check the Book  Details" });

            }
        }

        else {
            res.status(400).json({ message: "Unauthorized Access" })
        }
    }


    catch (error) {
        res.status(401).json({ message: "Check Book  details" });

    }
})



export { AdminRoute };



















