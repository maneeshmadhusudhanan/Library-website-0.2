import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  BookName: { type: String},
  AutherName: { type: String },
  Description: { type: String,default: "Adding Book"  },
  ChooseBook: { type: String },
});




const AddadminSchema = new mongoose.Schema({
 
  AdminName: { type: String },
  Apassword: { type: String },
  role: { type: String, default: "admin" },
});




const Admins = mongoose.model("AdminDATA", AddadminSchema);
const Book = mongoose.model("BookDATA", BookSchema);
mongoose.connect("mongodb://localhost:27017/LIBRARY_WEBSITE");

export { Book , Admins };