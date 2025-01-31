import connectDB from "./database/connectDB";

const startServer = async () => {
    await connectDB();

    /** @todo implement koa.js server */
    const port = process.env.PORT || 3000;
    console.log(`Server is running on port ${port}`);
};


export default startServer;