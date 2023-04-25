const Task = require("./model");

const create = async (body) => Task.create(body);

const getAllTasks = async (id) => Task.find({ owner: id });

const findTaskbyId = async (id) => Task.findById(id);

const findAndUpdateTask = async (id, body) => Task.findByIdAndUpdate(id, body, { new: true });

const findAndDeleteTask = async (id) => Task.findByIdAndDelete(id);

module.exports = { create, getAllTasks, findTaskbyId, findAndUpdateTask, findAndDeleteTask };