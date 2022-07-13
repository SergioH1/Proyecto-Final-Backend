import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const encrypt = async (source, salt = 10) => {
    return await bcrypt.hash(source, salt); // encrytar
};
export const compare = async (value, hash) => {
    return await bcrypt.compare(value, hash);
};
export const createToken = (tokenPayLoad) => {
    return jwt.sign(tokenPayLoad, process.env.SECRET);
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
};
