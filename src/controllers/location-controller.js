import {
    getAllLocationsQuery
} from "../db-queries.js";

export const getAllLocations = async (req, res, next) => {
    const locations = await getAllLocationsQuery();
    res.send(locations);
    await next();
};
