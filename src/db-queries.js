import mongoose from "mongoose";
import { db } from "./db.js";
import { ProductModel } from "./schemas/product.js";
import { UserModel } from "./schemas/user.js";
import pkg from "lodash";
import { TransactionModel } from "./Schemas/transaction.js";
const { keyBy } = pkg;

export const getAllProductQuery = () => {
  return ProductModel.find();
};

export const getAllTransactionsQuery = () => {
  return TransactionModel.find();
};

export const getTransactionByIdQuery = (id) => {
  return TransactionModel.findById(id);
};

export const createNewProductQuery = (product) => {
  return ProductModel.create(product);
};

export const createNewTransactionQuery = (transaction) => {
  return TransactionModel.create(transaction);
};

export const updateProductQuery = (id, product) => {
  return ProductModel.findOneAndUpdate({ _id: id }, product, { new: true });
};
export const updateTransactionQuery = (id, transaction) => {
  return TransactionModel.findOneAndUpdate({ _id: id }, transaction, {
    new: true,
  });
};

export const deleteProductQuery = (id) => {
  return ProductModel.findByIdAndDelete(id);
};
export const deleteTransactionQuery = (id) => {
  return TransactionModel.findByIdAndDelete(id);
};

export const groupbyCategoryQuery = () => {
  return ProductModel.aggregate([
    {
      $group: {
        _id: { category: "$category" },
        totalProducts: { $sum: 1 },
      },
    },
  ]);
};

export const getProductsWithFiltersQuery = (
  minPrice,
  maxPrice,
  location,
  category
) => {
  return ProductModel.find()
    .where("price")
    .gt(minPrice)
    .lt(maxPrice)
    .where("location")
    .equals(location)
    .where("category")
    .equals(category);
};

export const getProductByIdQuery = (id) => {
    return ProductModel.find().
    where("_id").equals(id);
};

export const checkCredentialsQuery = (username, password) => {
  const query = { userName: username, password: password };
  return UserModel.find(query);
};

export const createNewUserQuery = (user) => {
  return UserModel.create(user);
};




