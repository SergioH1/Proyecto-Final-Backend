import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { isEmail } from '../helpers/is.email.js';

/* istanbul ignore file */
(async () => {
    await mongooseConnect();
})();
const userSchema = new mongoose.Schema({
    userName: { type: mongoose.SchemaTypes.String, required: true },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: [isEmail, 'Provided email is not valid.'],
        unique: true,
    },
    password: { type: mongoose.SchemaTypes.String, required: true },
    recipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }],
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

export const User = mongoose.model('User', userSchema);
