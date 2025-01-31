import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bank-challenge');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (exception) {
        const error = exception as Error;
        console.error(`Error: ${error.message}`);
    }
};
export default connectDB;