import { Schema, model, models } from "mongoose";

const AdSchema = new Schema({
  brandAddress: {
    type: String,
    unique: true,
  },
  productName: {
    type: String,
  },
  budget: {
    type: Number,
  },
  numberOfTargetedAds: {
    type: Number,
  },
  addId: {
    type: String,
  },
});

const Ad = models.Brand || model("Ad", AdSchema);

export default Ad;
