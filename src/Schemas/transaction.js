import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  seller: String,
  buyer: String,
  product: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});

export const TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
