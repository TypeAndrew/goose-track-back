const { model, Schema } = require("mongoose");

const Task = model(
  "task",
  new Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    start: String,
    end: String,
    
    
   
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  })
);

module.exports = Task;