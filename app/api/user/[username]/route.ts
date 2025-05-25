import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const username = params.username;

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const userRef = ref(database, `Users/${username}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = snapshot.val();
    // Do not send the password back to the client
    const { Password, ...userSafeData } = userData;

    return NextResponse.json({
      success: true,
      data: {
        username: username,
        targetRole: userSafeData["Target Role"],
        pricing: userSafeData.pricing,
        resumeData: userSafeData["file data"],
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Get User API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
