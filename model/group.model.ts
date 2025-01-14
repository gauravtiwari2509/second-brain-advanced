import { model, Schema } from "mongoose";
interface IGroup {}
const GroupScheme = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    subGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Groups",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const GroupModel = model<IGroup>("Groups", GroupScheme);
