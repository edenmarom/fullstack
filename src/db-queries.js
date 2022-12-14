import { ProductModel } from "./schemas/product.js";
import { UserModel } from "./schemas/user.js";
import { TransactionModel } from "./Schemas/transaction.js";
import { LocationModel } from "./Schemas/location.js";

export const getAllProductQuery = () => {
  return ProductModel.find();
};

export const getAllTransactionsQuery = () => {
  return TransactionModel.find();
};

export const getAllUsersQuery = () => {
  return UserModel.find();
};

export const createNewProductQuery = (product) => {
  return ProductModel.create(product);
};

export const createNewTransactionQuery = (transaction) => {
  return TransactionModel.create(transaction);
};

export const createNewUserQuery = (user) => {
  return UserModel.create(user);
};

export const updateProductQuery = (id, product) => {
  return ProductModel.findOneAndUpdate({ _id: id }, product, { new: true });
};

export const updateTransactionQuery = (id, transaction) => {
  return TransactionModel.findOneAndUpdate({ _id: id }, transaction, {new: true,});
};

export const updateUserQuery = (id, user) => {
  return UserModel.findOneAndUpdate({ _id: id }, user, { new: true });
};

export const deleteProductQuery = (id) => {
  return ProductModel.findByIdAndDelete(id);
};

export const deleteTransactionQuery = (id) => {
  return TransactionModel.findByIdAndDelete(id);
};

export const deleteUserQuery = (id) => {
  return UserModel.findByIdAndDelete(id);
};

export const getProductByIdQuery = (id) => {
  return ProductModel.find().
  where("_id").equals(id);
};

export const getTransactionByIdQuery = (id) => {
  return TransactionModel.findById(id);
};

export const getUserByNameQuery = (name) => {
  return UserModel.find().
  where("userName").equals(name);
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

export const getMyProductsToSaleListQuery = (id) => {
    return ProductModel.find().
    where("publisherId").equals(id);
};

export const checkCredentialsQuery = (username, password) => {
  const query = { userName: username, password: password };
  return UserModel.find(query);
};


export const purchaseCountPerMonthQuery = (id) => {
    return TransactionModel.aggregate([
        {
            $match: {
             buyer: id
            }
           }, {
            $group: {
             _id: {
              month: {
               $dateToString: {
                format: '%Y-%m',
                date: '$create_date'
               }
              },
              buyer: '$buyer'
             },
             productsCount: {
              $count: {}
             }
            }
           }
    ]);
};

export const salesCountPerMonthQuery = (id) => {
    return TransactionModel.aggregate([
        {
            $match: {
                seller: id
            }
           }, {
            $group: {
             _id: {
              month: {
               $dateToString: {
                format: '%Y-%m',
                date: '$create_date'
               }
              },
              seller: '$seller'
             },
             productsCount: {
              $count: {}
             }
            }
           }
    ]);
};

export const getAllProductsByCategoryQuery = (category) => {
  return ProductModel.find().
  where("category").equals(category);
};

export const getMostBoughtCategoryQuery = (id) => {
  return TransactionModel.aggregate([
    {
        $match: {
            buyer: id
        }
    }, {
        $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'ProdDetail'
        }
    }, {
        $project: {
            _id: 1,
            'ProdDetail.category': 1
        }
    }, {
        $group: {
            _id: {
                Cat: '$ProdDetail.category'
            },
            countOfCat: {
                $count: {}
            }
        }
    }, {
        $sort: {
            'countOfCat': -1
        }
    }, {
        $limit: 1
    }
]);
};

export const getAllLocationsQuery = () => {
  return LocationModel.find();
};
