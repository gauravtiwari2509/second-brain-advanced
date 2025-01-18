import { model, models, Schema, Types } from "mongoose";
interface IGroup {
  name: string;
  userId: Schema.Types.ObjectId;
  subGroups?: Types.ObjectId[];
}

const GroupScheme = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
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

export const GroupModel =
  models?.Groups || model<IGroup>("Groups", GroupScheme);
