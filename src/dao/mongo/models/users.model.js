import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
  },
});

export const usersModel = mongoose.model(usersCollection, userSchema);
