import mongoose, { ConnectOptions } from "mongoose";

const mongodbUri: any = process.env.MONGO_DB;

const conn: any = {
  isConnected: false,
};

const connectDB = async () => {
  if (conn.isConnected) return null;

  const db = await mongoose.connect(mongodbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName);
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

export default connectDB;
