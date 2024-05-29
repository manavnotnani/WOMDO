import { Schema, model, models } from "mongoose";

const BrandSchema = new Schema({
  name: {
    type: String,
  },
  niche: {
    type: String,
  },
  budget: {
    type: Number,
  },
  numberOfTargetedAds: {
    type: Number,
  },
});

const Brand = models.Certificate || model("Brand", BrandSchema);

export default Brand;
