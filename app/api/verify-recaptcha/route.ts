// app/api/verify-recaptcha/route.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const secretKey =
      process.env.NODE_ENV === "development"
        ? "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
        : process.env.RECAPTCHA_SECRET_KEY;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const { success } = response.data;

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error("Error verifying reCAPTCHA", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
