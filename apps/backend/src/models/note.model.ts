import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ SERVERLESS SAFE FIX
export const Note =
  mongoose.models.Note || mongoose.model<INote>("Note", noteSchema);