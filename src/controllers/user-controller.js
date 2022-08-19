import {
    checkCredentialsQuery,
    createNewUserQuery
} from "../db-queries.js";

export const checkCredentials = async (req, res, next) => {
    const username = (req.body.userName);
    const password = (req.body.password);
    const result = await checkCredentialsQuery(username, password);
    result.length!=0 ? res.send(result) : res.status(404).send(`Wrong Credentials.`);
    await next();
};

export const createUser = async (req, res, next) => {
    const savedUser = await createNewUserQuery(req.body);
    res.send(savedUser);
    await next();
};
