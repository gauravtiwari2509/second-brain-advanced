import { model, models, Schema } from "mongoose";

export interface ILink extends Document {
  hashId: string;
  UserId: Schema.Types.ObjectId;
}
const LinkSchema: Schema<ILink> = new Schema(
  {
    hashId: {
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

export const LinkModel = models.Links || model<ILink>("Links", LinkSchema);
