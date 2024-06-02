import { connectToDb } from "@/database/connect";
import Influencer from "@/database/models/InfluencerModel";
import BrandCollab from "@/database/models/brandCollabModel";
import Ad from "@/database/models/adModel";
import { NextRequest, NextResponse } from "next/server";
import Brand from "@/database/models/brandModel";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    console.log("params", params);
    await connectToDb();
    console.log("params", typeof params.adId);

    const getAd = await Ad.find({ adId: params.adId });

    const addressArray = getAd[0].acceptedUserAddress;

    const numberOfTargetedAds = getAd[0].numberOfTargetedAds;

    if (addressArray.length < numberOfTargetedAds) {
      let zerosArray = new Array(numberOfTargetedAds + 1).fill(0);
      zerosArray[numberOfTargetedAds] = Number(getAd[0].adId);

      return NextResponse.json(
        { status: true, message: "Not Found", data: zerosArray },
        { status: 404 }
      );
    }



    const getAllAcceptedInfluencers = await BrandCollab.find({
      adId: params.adId,
      acceptedStatus: true,
      rating: { $exists: true },
    });
    console.log("getAllInfluencers", getAllAcceptedInfluencers);

    if (getAllAcceptedInfluencers) {
      return NextResponse.json(
        {
          status: true,
          message: "Influencer Details with Ratings Fetched Successfully",
        //   data: getAllInfluencers,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: true, message: "Influencer Details Not Found", data: {} },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
