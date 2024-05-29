import { Schema, model, models } from "mongoose";

const InfluencerSchema = new Schema({
  name: {
    type: String,
  },
  youtubeProfile: {
    type: String,
  },
  totalViewCount: {
    type: Number,
  },
  followerCount: {
    type: Number,
  },
  overallWatchtime: {
    type: Number,
  },
  niche: {
    type: String,
  },
});

const Influencer = models.Certificate || model("Influencer", InfluencerSchema);

export default Influencer;
