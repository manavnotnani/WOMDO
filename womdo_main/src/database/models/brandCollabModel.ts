import { Schema, model, models } from "mongoose";

const BrandCollabSchema = new Schema({
  adId: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  influencerName: {
    type: String,
  },
  influencerAddress: {
    type: String,
    required: true, // Ensure this field is required if it should always have a value
  },
  requestSentStatus: {
    type: Boolean,
    default: true
  },
  acceptedStatus: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
  },
  videoId: {
    type: String
  },
  brandName: {
    type: String
  }, 
  productName: {
    type: String
  }, 
  brandAddress: {
    type: String
  },
  subscribers: {
    type: Number
  }
});

// Create a unique compound index on addId and influencerAddress
BrandCollabSchema.index({ addId: 1, influencerAddress: 1 }, { unique: true });

const BrandCollab =
  models.BrandInfluencer || model("BrandCollab", BrandCollabSchema);

export default BrandCollab;
