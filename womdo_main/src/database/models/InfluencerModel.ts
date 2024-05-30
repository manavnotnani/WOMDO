import { Schema, model, models } from "mongoose";

const InfluencerSchema = new Schema({
  name: {
    type: String,
  },
  channelName: {
    type: String,
  },
  totalViewCount: {
    type: Number,
  },
  subscribers: {
    type: Number,
  },
  overallWatchtime: {
    type: Number,
  },
  category: {
    type: String,
  },
  wallet: {
    type: String,
    unique: true,
  },
  channelLink: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Influencer = models.Certificate || model("Influencer", InfluencerSchema);

export default Influencer;
