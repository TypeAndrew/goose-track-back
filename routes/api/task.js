const express = require("express");

const taskController = require("../controllers/tasks");
const { checkTokensData } = require("../middlewares/usersMiddlewares");
const {
  validateData,
  validateDataForEditing,
} = require("../middlewares/tasks");

const router = express.Router();

router.get("/", checkTokensData, taskController.getAllTasks);

router.post("/", checkTokensData, validateData, taskController.createTask);

router.patch("/:taskId", checkTokensData, validateDataForEditing, taskController.editTask);


router.delete("/:taskId", checkTokensData, taskController.deleteTask);

module.exports = router;