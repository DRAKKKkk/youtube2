import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    url: String,
    thumbnail: String,
    views: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

export default Video;
