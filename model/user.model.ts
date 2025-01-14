import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}
const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
