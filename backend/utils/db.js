import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected successfully.");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.LOCAL_DATABASE_URI);

//     console.log(
//       `MongoDB connected to: ${conn.connection.host}`.white.underline.bold
//     );
//   } catch (error) {
//     console.error(`MongoDB connection error: ${error}`.red.underline.bold);
//   }
// };

// export default connectDB;
