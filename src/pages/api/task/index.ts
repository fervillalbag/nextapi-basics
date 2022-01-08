import type { NextApiRequest, NextApiResponse } from "next";
import Task from "models/Task";
import connectDB from "utils/mongoose";

connectDB();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const task = await Task.find();
  console.log(task);

  return res.status(405).end();
};

export default handler;
