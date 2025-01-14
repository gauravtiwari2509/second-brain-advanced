import { Document, Schema, model, models } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
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

// Check if the model already exists to avoid overwriting
export const UserModel = models.Users || model<IUser>("Users", UserSchema);
