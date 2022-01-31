import type { NextApiRequest, NextApiResponse } from "next";
import Task from "models/Task";
import connectDB from "utils/mongoose";

connectDB();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.find();
        return res.status(200).json(task);
      } catch (error) {
        res.status(400).json({ msg: error });
      }

    case "POST":
      try {
        const newTask = await new Task(body);
        const savedTask = await newTask.save();
        return res.status(200).json(savedTask);
      } catch (error) {
        res.status(400).json({ msg: error });
      }

    default:
      return res.status(400).json({ msg: "Invalid method" });
  }
};

export default handler;
