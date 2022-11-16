import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/* istanbul ignore file */
export async function mongooseConnect() {
    const url =
        process.env.NODE_ENV?.toLowerCase() === 'test'
            ? process.env.URL_MONGO_TEST
            : process.env.URL_MONGO;

    return mongoose.connect(url as string);
}
