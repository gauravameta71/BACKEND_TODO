import mongoose from "mongoose"

//Connection
export const connectDB = ()=>{
  mongoose
    .connect(process.env.MONGO_URI , {
      dbName: "BACKEND_API",
    })
    .then(() => console.log("Database Connect"))
    .catch((e) => console.log(e));
}
