const express = require("express");
const userRouter = express.Router();

const {
  signUpUser,
  signInUser,
  getCurrentUser,
  patchSubscription,
  logOutUser,
} = require("../../model/user");
const { tokenMiddleware } = require("../../services/tokenMiddleware");
const { signUpValidate, signInValidate } = require("../../services/validation");
const asyncWrapper = require("../../services/asyncWrapper");

userRouter.get("/current", tokenMiddleware, asyncWrapper(getCurrentUser));

userRouter.post("/register", signUpValidate, asyncWrapper(signUpUser));

userRouter.post("/login", signInValidate, asyncWrapper(signInUser));

userRouter.post("/logout", tokenMiddleware, asyncWrapper(logOutUser));

userRouter.patch("/", tokenMiddleware, asyncWrapper(patchSubscription));

module.exports = userRouter;
