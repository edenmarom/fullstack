import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getGroupbyCategory,
  getProductsWithFilters,
} from "../controllers/product-controller.js";
export const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/createProduct", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/groupByCategory", getGroupbyCategory);
productRouter.post("/getProductsWithFilters", getProductsWithFilters);
