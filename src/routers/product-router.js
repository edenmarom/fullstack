import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getGroupbyCategory,
  getProductsWithFilters,
  getPublisherByProductId,
  getStatusByProductId,
  getMyProductsToSaleList,
  getAllProductsByCategory
} from "../controllers/product-controller.js";
export const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/createProduct", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/groupByCategory", getGroupbyCategory);
productRouter.post("/getProductsWithFilters", getProductsWithFilters);
productRouter.get('/publisher/:id', getPublisherByProductId);
productRouter.get('/status/:id', getStatusByProductId);
productRouter.get('/myProductsToSaleList/:id', getMyProductsToSaleList);
productRouter.get('/getAllProductsByCategory/:category', getAllProductsByCategory);
