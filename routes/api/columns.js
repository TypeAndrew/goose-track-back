const express = require("express");
const {
  getColumns,
  createColumn,
  deleteColumn,
} = require("../../controllers/columnsControllers");
const router = express.Router();

const usersMiddlewares = require("../../middlewares/usersMiddlewares");
router.use(usersMiddlewares.checkTokensData);

router.get("/", getColumns);
router.post("/", createColumn);
router.delete("/:id", deleteColumn);

module.exports = router;
