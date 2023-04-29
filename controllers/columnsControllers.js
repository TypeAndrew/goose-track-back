const Column = require("../models/columnModel");
const { catchAsync } = require("../utils");

/**
 * Get columns list
 */
const getColumns = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const columns = await Column.find({ owner });

  res.status(200).json({
    columns,
  });
});

/**
 * New column create
 */
const createColumn = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;

  const columns = await Column.find({ owner });

  req.body.owner = owner;
  req.body.number = Number(columns.length) + 1;

  const column = await Column.create(req.body);

  res.status(201).json(column);
});


/**
 * delete column 
 */
const deleteColumn = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  await Column.findByIdAndRemove(id, owner);

  res.status(200).json({ message: "contact deleted" });
});

module.exports = {
  getColumns,
  createColumn,
  deleteColumn,
};
