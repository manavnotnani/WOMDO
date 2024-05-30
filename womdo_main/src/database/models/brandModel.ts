import { Schema, model, models } from "mongoose";

const BrandSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  budget: {
    type: Number,
  },
  numberOfTargetedAds: {
    type: Number,
  },
  brandId:{
    type: String,
  },
  addId : {
    type: String
  },
  brandAddress: {
    type: String
  }

});

const Brand = models.Certificate || model("Brand", BrandSchema);

export default Brand;
