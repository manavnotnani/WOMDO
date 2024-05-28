import { connectToDb } from '@/database/connect';
import Influencer from '@/database/models/InfluencerModel';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        await connectToDb()
        const reqObj = await req.json();
        console.log('reqObj', reqObj);




        // const _certificate = await Influencer.findOne({ recipientEmail: validation.data.recipientEmail.toLowerCase() });
        // if (_certificate) return NextResponse.json({ status: true, message: "Certificate Already Exits with this email address", data: _certificate }, { status: 200 });


        // const generatedCertificateNumber = randomUUID();
        // const certificateNumber = String(generatedCertificateNumber).toLowerCase();

        // console.log({ certificateNumber });


        const newPrompt = new Influencer(reqObj);
        console.log('newPrompt', newPrompt);
        await newPrompt.save();
        return NextResponse.json({ status: true, message: "Influencer Details Saved Successfully", data: newPrompt }, { status: 201 })
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ status: false, message: error.message }, { status: 500 })
    }
}