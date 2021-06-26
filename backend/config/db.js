// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
      
    })
    console.log(`MongoDB connected:${process.env.DB_HOST}:${process.env.PORT}-->db name ${process.env.DB_NAME}`.rainbow)
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};
// export default connectDB
module.exports=connectDB