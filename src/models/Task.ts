import { model, models, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title es required"],
      trim: true,
      maxlength: [40, "Title must be less than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Descripition es required"],
      trim: true,
      maxlength: [200, "Title must be less than 40 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.Task || model("Task", TaskSchema);
