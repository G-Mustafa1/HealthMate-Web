import mongoose from "mongoose";
import validator from "validator";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            minLength: 3,
            maxLength: 30,
            required: true
        },
        email: {
            type: String,
            index: true,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email")
                }
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Use Strong Password")
                }
            }
        },
    },
    {
        collection: 'user',
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

export default User