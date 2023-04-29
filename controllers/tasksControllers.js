const { isValidObjectId } = require("mongoose");
const tasksServices = require("../services/tasksService");

/**
 * Get all task list
 * get tasks
 */
const getAllTasks = async (req, res) => {
  const userId = req.user.id;
  const tasks = await tasksServices.getAllTasks(userId);
  return res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const owner = req.user.id;
  const { title, start, end, priority, date, category } = req.body;

  const task = await tasksServices.create({
    title,
    start,
    end,
    priority,
    date,
    category,
    owner,
  });

  return res.status(201).json({ task });
};

/**
 * Edit task
 * patch tasks/:id
 */
const editTask = async (req, res) => {
  const ownerId = req.user.id;
  const taskId = req.params.taskId;
  const { title, start, end, priority, date, category } = req.body;

  if (!isValidObjectId(taskId)) {
    return res.status(400).json({
      message:
        "Bad Request. Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
    });
  }

  if (!title && !start && !end && !priority) {
    return res.status(400).json({ message: "missing fields" });
  }

  const findTask = await tasksServices.findTaskbyId(taskId);

  if (!findTask || findTask.owner.valueOf() !== ownerId) {
    return res.status(400).json({ message: "Invalid card id" });
  }

  const task = await tasksServices.findAndUpdateTask(taskId, {
    title,
    start,
    end,
    priority,
    date,
    category,
  });

  return res.status(200).json({ task });
};

/**
 * Delete task
 * delete tasks/:id
 */
const deleteTask = async (req, res) => {
  const ownerId = req.user.id;
  const taskId = req.params.taskId;

  if (!isValidObjectId(taskId)) {
    return res.status(400).json({
      message:
        "Bad Request. Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
    });
  }

  try {
    const findTask = await tasksServices.findTaskbyId(taskId);

    if (!findTask || findTask.owner.valueOf() !== ownerId) {
      return res.status(400).json({ message: "Invalid card id" });
    }

    await tasksServices.findAndDeleteTask(taskId);

    return res.status(204).json({ message: "Deletion was successful" });
  } catch (err) {
    return res.status(400).json({message: "Something go wrong"})
  }
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
};
