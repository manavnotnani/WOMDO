import { connectToDb } from "@/database/connect";
import BrandCollab from "@/database/models/brandCollabModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    console.log("params", params);
    await connectToDb();
    console.log("params", params.influencerAddress);

    // Construct the regular expression for case-insensitive exact match
    const walletAddressRegex = new RegExp(`^${params.influencerAddress}$`, "i");
    console.log("walletAddressRegex", walletAddressRegex);

    const influencerDetails = await BrandCollab.find({
      influencerAddress: { $regex: walletAddressRegex },
      rating: { $exists: true },
    });

    console.log("influencerDetails", influencerDetails);

    if (influencerDetails) {
      return NextResponse.json(
        {
          status: true,
          message: "Influencer Collab Details Fetched Successfully",
          data: influencerDetails,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: false, message: "Influencer Collab Details Not Found", data: {} },
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
