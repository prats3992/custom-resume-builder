import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    const userRef = ref(database, `Users/${username}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const userData = snapshot.val();

    if (userData.Password !== password) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Do not send the password back to the client
    const { Password, ...userSafeData } = userData;

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        username: username,
        targetRole: userSafeData["Target Role"],
        pricing: userSafeData.pricing,
        resumeData: userSafeData["file data"],
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
