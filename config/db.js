import { config } from "dotenv";
import mongoose from "mongoose";

config()
const connectDB = () => {
    mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOST}/${process.env.MONGO_INITDB_DATABASE}?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Failed to connect to MongoDB", err));
};

export default connectDB;