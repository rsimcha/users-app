import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const UserModel = mongoose.model("User", UserSchema);
