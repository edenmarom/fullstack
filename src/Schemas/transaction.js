import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  seller: String,
  buyer: String,
  product: mongoose.Types.ObjectId,
  create_date: {
    type: Date,
    default: Date.now,
  },
});

export const TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
