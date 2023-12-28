import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { usersController } from "../controllers/users.controller.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), usersController.modifyRole);

export { router as usersRouter };
