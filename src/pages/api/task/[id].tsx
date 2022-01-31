import TaskModel from "models/Task";
import connectDB from "utils/mongoose";

connectDB();

const handler = async (req: any, res: any) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const task = await TaskModel.findOne({ _id: query.id });
        if (!task)
          return res.status(204).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
      }

    case "PUT":
      try {
        const taskDeleted = await TaskModel.findOneAndUpdate(
          { _id: query.id },
          body,
          {
            new: true,
          }
        );
        if (!taskDeleted)
          return res.status(204).json({ msg: "Task not found" });
        return res.status(200).json({ msg: "Task updated" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
      }

    case "DELETE":
      try {
        const taskDeleted = await TaskModel.findOneAndDelete({
          _id: query.id,
        });
        if (!taskDeleted)
          return res.status(204).json({ msg: "Task not found" });
        return res.status(200).json({ msg: "Task deleted" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
      }

    default:
      return res.status(400).json({ msg: "Method not avaivable" });
  }
};

export default handler;
