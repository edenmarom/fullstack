import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: String,
  long: String,
  lat: String,
});

export const LocationModel = mongoose.model("Location", LocationSchema);
