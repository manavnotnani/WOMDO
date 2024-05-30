import { connectToDb } from '@/database/connect';
import BrandInfluencer from '@/database/models/brandInfluencerData';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const reqObj = await req.json();
        console.log('reqObj', reqObj);
        const newPrompt = new BrandInfluencer(reqObj);
        console.log('newPrompt', newPrompt);
        await newPrompt.save();
        return NextResponse.json({ status: true, message: "Request Sent to Influencer Successfully", data: newPrompt }, { status: 201 })
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}