import express from "express";
import { authentication } from "../middlewares/authentication.js";
import {
  createTask,
  getMyTask,
  getAllTask,
  getParticularUserTask,
  getParticularTaskDetails,
  updateTask, updateAssignee
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authentication, createTask);
router.get("/", authentication, getMyTask);
router.patch("/:taskId", authentication, updateTask);
router.patch("/:taskId/status", authentication, updateTask);
router.patch("/:taskId/assignedTo", authentication, updateAssignee);
router.get("/:taskId", authentication, getParticularTaskDetails);
router.get("/getUserTask/:userId", authentication, getParticularUserTask);
router.get("/getTask/:taskId", authentication, getParticularTaskDetails);

export default router;
