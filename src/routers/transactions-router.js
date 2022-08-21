import express from "express";
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
} from "../controllers/transaction-controller.js";
export const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.post("/createTransaction", createTransaction);
transactionsRouter.put("/:id", updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);
// productRouter.get("/groupByCategory", getGroupbyCategory);
// productRouter.post("/getProductsWithFilters", getProductsWithFilters);
