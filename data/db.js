import mongoose from "mongoose"

//Connection
export const connectDB = ()=>{
  mongoose
    .connect(process.env.MONGO_URI , {
      dbName: "BACKEND_API",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
}
