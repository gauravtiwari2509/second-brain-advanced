import { model, Schema } from "mongoose";

interface ILink extends Document {
  url: string;
  UserId: Schema.Types.ObjectId;
}
const LinkSchema: Schema<ILink> = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export const LinkModel = model<ILink>("Links", LinkSchema);
