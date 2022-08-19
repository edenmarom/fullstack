import mongoose from 'mongoose';
import { db } from './db.js';
import { ProductModel } from './schemas/product.js';
import { UserModel } from './schemas/user.js';
import pkg from 'lodash';
const { keyBy } = pkg;

export const getAllProductQuery = () => {
return ProductModel.find();
};

export const createNewProductQuery = (product) => {
  return ProductModel.create(product);
};

export const updateProductQuery = (id, product) => {
  return ProductModel.findOneAndUpdate({ '_id': id }, product, { new: true });
};

export const deleteProductQuery = (id) => {
    return ProductModel.findByIdAndDelete(id);
};

export const groupbyCategoryQuery = () => {
    return ProductModel.aggregate([
    {
        $group:
        {
            _id: { category: "$category" },
            totalProducts: { $sum: 1 },
        }
    }
    ]);
};

export const getProductsWithFiltersQuery = (minPrice, maxPrice, location, category) => {
    return ProductModel.find().
    where("price").gt(minPrice).lt(maxPrice).
    where("location").equals(location).
    where("category").equals(category);
};

export const checkCredentialsQuery = (username, password) => {
    const query= {'userName': username, 'password': password};
    return UserModel.find(query);
};

export const createNewUserQuery = (user) => {
    return UserModel.create(user);
};
