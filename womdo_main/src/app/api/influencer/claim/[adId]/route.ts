import { connectToDb } from "@/database/connect";
import Influencer from "@/database/models/InfluencerModel";
import BrandCollab from "@/database/models/brandCollabModel";
import Ad from "@/database/models/adModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    console.log("params", params);
    await connectToDb();
    console.log("params", typeof params.adId);

    const getAd = await Ad.findOne({adId: params.adId});

    const numberOfTargetedAds = getAd.numberOfTargetedAds;

    console.log('getAd', getAd);

    const getAllInfluencers = await BrandCollab.find({
      adId: params.adId,
      acceptedStatus: true,
      rating: { $exists: true },
    });
    console.log('getAllInfluencers', getAllInfluencers);

    if (getAllInfluencers) {
      return NextResponse.json(
        {
          status: true,
          message: "Influencer Details with Ratings Fetched Successfully",
          data: getAllInfluencers,
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
