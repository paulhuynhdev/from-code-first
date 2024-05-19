import express from "express";
import UserController from "../controllers/user.controller";
import RequestValidate from "../middlewares/request.validate";
import { CreateUserSchema, UpdateUserSchema } from "../validators/user.schema";

const router = express.Router();

router.post(
  "/new",
  RequestValidate.body(CreateUserSchema),
  UserController.createUser
);

router.post(
  "/edit/:userId",
  RequestValidate.body(UpdateUserSchema),
  UserController.editUser
);

router.get("/", UserController.getUserByEmail);

export default router;
