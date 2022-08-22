import {
    createNewProductQuery,
    deleteProductQuery,
    getAllProductQuery,
    updateProductQuery,
    groupbyCategoryQuery,
    getProductsWithFiltersQuery,
    getProductByIdQuery
} from "../db-queries.js";

export const getAllProducts = async (req, res, next) => {
    const products = await getAllProductQuery();
    res.send(products);
    await next();
};

export const createProduct = async (req, res, next) => {
    const savedProduct = await createNewProductQuery(req.body);
    res.send(savedProduct);
    await next();
};

export const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const productToUpdate = req.body;
    const updatedProduct = await updateProductQuery(id, productToUpdate);
    updatedProduct ? res.send(updatedProduct) : res.status(404).send(`Product [id = ${id}] not found.`);
    await next();
};

export const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    const deletedProduct = await deleteProductQuery(id);
    deletedProduct ? res.send(deletedProduct) : res.status(404).send(`Product [id = ${id}] not found.`);
    await next();
};

export const getGroupbyCategory = async (req, res, next) => {
    const groups = await groupbyCategoryQuery();
    res.send(groups);
    await next();
};

export const getProductsWithFilters = async (req, res, next) => {
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;
    const location = req.body.location;
    const category = req.body.category;
    const products = await getProductsWithFiltersQuery(minPrice, maxPrice, location, category);
    res.send(products);
    await next();
};


export const getPublisherByProductId = async (req, res, next) => {
    const id = req.params.id;
    const product = await getProductByIdQuery(id);
    product[0].publisherId ? res.send(product[0].publisherId) : res.status(404).send(`Product [id = ${id}] not found.`);
    await next();
};

