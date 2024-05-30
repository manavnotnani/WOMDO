import { connectToDb } from "@/database/connect";
import BrandInfluencer from "@/database/models/brandInfluencerData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    await connectToDb();
    console.log("params", params.wallet);
    console.log("req", req);

    const url = new URL(req.url);
    const boolStatus = new URLSearchParams(url.searchParams);
    console.log("boolStatus", boolStatus);
    console.log("accepted", boolStatus.get("accepted"));

    // Construct the regular expression for case-insensitive exact match
    const walletAddressRegex = new RegExp(`^${params.wallet}$`, "i");
    console.log("walletAddressRegex", walletAddressRegex);
    let influencerBrandDetails;

    if (boolStatus.get("accepted") == null) {
      influencerBrandDetails = await BrandInfluencer.find({
        influencerAddress: { $regex: walletAddressRegex },
      });
    } else {
      influencerBrandDetails = await BrandInfluencer.find({
        influencerAddress: { $regex: walletAddressRegex },
        acceptedStatus: boolStatus.get("accepted"),
      });
    }

    console.log("influencerBrandDetails", influencerBrandDetails);

    if (influencerBrandDetails) {
      return NextResponse.json(
        {
          status: true,
          message: "Influencer Details Fetched Successfully",
          data: influencerBrandDetails,
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
