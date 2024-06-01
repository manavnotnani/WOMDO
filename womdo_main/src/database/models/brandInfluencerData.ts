import { Schema, model, models } from "mongoose";

const BrandInfluencerSchema = new Schema({
  brandId: {
    type: String,
  },
  addId: {
    type: String,
  },
  influencer: {
    type: String,
  },
  influencerAddress: {
    type: String,
  },
  requestSentStatus:{
    type: Boolean,
    default: false
  },
  acceptedStatus: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
  },
  subscribers:{
    type: Number
  },
  videoId:{
    type: String
  }
});

const BrandInfluencer =
  models.BrandInfluencer || model("BrandInfluencer", BrandInfluencerSchema);

export default BrandInfluencer;
