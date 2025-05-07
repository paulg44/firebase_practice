import express from "express";

import * as userController from "./controller.js";

export const userRoutes = express.Router();

userRoutes.post("/register", userController.addUsernameController);

userRoutes.get("/data", userController.retrieveDataController);
