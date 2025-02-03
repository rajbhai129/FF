import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmailController,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUser);
userRouter.get("/logout", auth, logoutUser);

export default userRouter;
