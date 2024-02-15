import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/getUsers/:page", verifyToken, getUsers);
router.get("/getUser/:id", verifyToken, getUser);
router.post("/createUser", verifyToken, createUser);
router.put("/updateUser/:id", verifyToken, updateUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser);

export default router;
