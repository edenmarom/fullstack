import {
    checkCredentialsQuery,
    createNewUserQuery,
    getAllUsersQuery,
    updateUserQuery,
    deleteUserQuery,
    getUserByNameQuery
} from "../db-queries.js";

export const checkCredentials = async (req, res, next) => {
    const username = (req.body.userName);
    const password = (req.body.password);
    const result = await checkCredentialsQuery(username, password);
    result.length !== 0 ? res.send(result) : res.status(404).send(`Wrong Credentials.`);
    await next();
};

export const createUser = async (req, res, next) => {
    const savedUser = await createNewUserQuery(req.body);
    res.send(savedUser);
    await next();
};

export const getAllUsers = async (req, res, next) => {
    const users = await getAllUsersQuery();
    res.send(users);
    await next();
};

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const userToUpdate = req.body;
    const updatedUser = await updateUserQuery(id, userToUpdate);
    updatedUser ? res.send(updatedUser) : res.status(404).send(`User [id = ${id}] not found.`);
    await next();
};

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const deletedUser = await deleteUserQuery(id);
    deletedUser ? res.send(deletedUser) : res.status(404).send(`User [id = ${id}] not found.`);
    await next();
};

export const getUserByName = async (req, res, next) => {
    const name = req.params.name;
    const user = await getUserByNameQuery(name);
    user ? res.send(user) : res.status(404).send(`User [id = ${id}] not found.`);
    await next();
};
