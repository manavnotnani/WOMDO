import { Schema, model, models } from "mongoose";

const BrandInfluencerSchema = new Schema({
  addId: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  influencer: {
    type: String,
  },
  influencerAddress: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  requestSentStatus: {
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
  subscribers: {
    type: Number
  },
  videoId: {
    type: String
  },
  brand: {
    type: String
  }
});

// Create a unique compound index on addId and influencerAddress
BrandInfluencerSchema.index({ addId: 1, influencerAddress: 1 }, { unique: true });

const BrandInfluencer =
  models.BrandInfluencer || model("BrandInfluencer", BrandInfluencerSchema);

export default BrandInfluencer;
