import Task from "../models/task.model.js";

export const createTaskService = async (
  title,
  description,
  priority,
  assignedTo,
  dueDate,
  createdBy
) => {
  if (!title || !description || !priority || !assignedTo || !dueDate || !createdBy) {
    throw new Error("MISSING_FIELDS");
  }

  await Task.create({
    title,
    description,
    priority,
    assignedTo,
    dueDate,
    createdBy
  });
};
