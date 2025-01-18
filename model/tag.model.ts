import { Document, model, models, Schema } from "mongoose";
interface ITag extends Document {
  title: string;
}
const TagSchema = new Schema<ITag>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TagModel = models.Tags || model<ITag>("Tags", TagSchema);
