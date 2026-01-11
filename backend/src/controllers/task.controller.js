import Task from "../models/task.model.js";
import { createTaskService } from "../services/task.service.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo, dueDate } = req.body;
    const createdBy = req.user.userId;
    await createTaskService(
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      createdBy
    );
    return res.status(201).json({
      message: "Task created successfully",
    });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    if (err.message === "MISSING_FIELDS")
      return res
        .status(400)
        .json({ message: "Please provide all the required fields!" });
    return res.status(500).json({ message: res.message });
  }
};

export const getMyTask = async (req, res) => {
  try {
    const filter = {
      isDeleted: false,
    };
    const isAdmin = req.user.role === "admin" ? true : false;
    let tasks;
    if (!isAdmin) {
      filter.assignedTo = req.user.userId;
    }
    tasks = (await Task.find(filter)).toSorted({ createdAt: -1 });

    if (tasks) return res.status(200).json({ "my Tasks": tasks });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No task found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const taskId = req.params.taskId;

    const task= await Task.findOne(
      { _id: taskId, isDeleted : false },
    );
    if(!task) return res.status(404).json({message : "Task not found"});

    if(req.user.role != "admin" && task.createdBy.toString() !== req.user.userId)
        return res.status(403).json({message : "Access Denied"});

    await Task.findByIdAndUpdate(taskId, {title, description, dueDate, priority }, { new:true, runValidators:true })
    res.status(202).json({ message: "Task Got Updated successfully!" });
  } catch (err) {
    console.log("err 55---", err);
    return res.status(500).json({ message: err });
  }
};

export const updateAssignee = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const taskId = req.params.taskId;
    const role = req.user.role;
    const userId = req.user.userId;
    const taskDetails = await Task.findOne({ _id: taskId });
    if (role == "admin" || (taskDetails && userId == taskDetails.assignedTo)) {
      const taskDetailsUpdate = await Task.findOneAndUpdate(
        { _id: taskId },
        { assignedTo }
      );
      if (taskDetailsUpdate)
        res.status(202).json({ message: "Task Got Updated successfully!" });
    } else {
      return res
        .status(400)
        .json({ message: "You are not allowed to do this" });
    }
  } catch (err) {
    console.log("err 55---", err);
    return res.status(500).json({ message: err });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find();
    if (allTask) return res.status(200).json({ "all Tasks": allTask });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No task found" });
  }
};

export const getParticularUserTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const task = await Task.find({ createdBy: userId });
    if (task) return res.status(200).json({ "my Tasks": task });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No task found" });
  }
};

export const getParticularTaskDetails = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    console.log(taskId);
    const task = await Task.findOne({ _id: taskId });
    if (task) return res.status(200).json({ "my Tasks": task });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No task found" });
  }
};
