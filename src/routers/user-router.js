import express from "express";
import {  checkCredentials, 
          createUser,
          updateUser,
          deleteUser,
          getAllUsers,
          getUserByName
} from "../controllers/user-controller.js";

export const userRouter = express.Router();

userRouter.post("/checkCredentials", checkCredentials);
userRouter.post("/createUser", createUser);
userRouter.put("/updateUser/:id", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.get("/getUserByName/:name", getUserByName);