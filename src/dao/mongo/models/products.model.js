import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  code: {
    required: true,
    type: String,
    unique: true,
  },
  stock: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: Boolean,
  },
  category: {
    required: true,
    type: String,
    enum: ["full", "top", "bottom"],
  },
  thumbnail: {
    required: true,
    type: String,
  },
});

productSchema.plugin(mongoosePaginate);

export const productsModel = new mongoose.model(
  productsCollection,
  productSchema
);
