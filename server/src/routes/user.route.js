import express from "express";
import { login, register, checkUser, detailsUser, deleteAUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/check", checkUser);
router.get("/:id", protect, detailsUser);
router.delete("/:id", protect, deleteAUser);

export default router;
