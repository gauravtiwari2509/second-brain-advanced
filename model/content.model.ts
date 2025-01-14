import { Document, model, Schema, Types } from "mongoose";
type ContentType =
  | "image"
  | "video"
  | "article"
  | "audio"
  | "document"
  | "social-media"
  | "web"
  | "other";

interface IContent extends Document {
  url: string;
  notes?: string;
  group: Types.ObjectId;
  type: ContentType;
  title: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}

const contentTypes: ContentType[] = [
  "image",
  "video",
  "article",
  "audio",
  "document",
  "social-media",
  "web",
  "other",
];

const contentSchema = new Schema<IContent>(
  {
    url: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
    group: {
      type: Schema.Types.ObjectId,
      ref: "Groups",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
export const ContentModel = model<IContent>("content", contentSchema);
