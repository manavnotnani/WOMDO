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
  status: {
    type: Boolean,
  },
});

const BrandInfluencer =
  models.Certificate || model("BrandInfluencer", BrandInfluencerSchema);

export default BrandInfluencer;
