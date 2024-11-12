import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: "user" },
});

const User = mongoose.model("USERDATA", userSchema);
mongoose.connect("mongodb://localhost:27017/LIBRARY_WEBSITE");

export { User };
