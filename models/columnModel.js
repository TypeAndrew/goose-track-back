const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const column = new Schema(
  {
    status: {
      type: String,
      required: [true, "Set status for column"],
    },
    number: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

const Column = mongoose.model("column", column);

module.exports = Column;
