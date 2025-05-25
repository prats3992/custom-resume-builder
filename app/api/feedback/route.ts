import { NextResponse } from "next/server"

// In-memory storage for server-side (this will reset on server restart)
const feedbackStore: any[] = []

export async function POST(request: Request) {
  try {
    const feedback = await request.json()

    // Add new feedback with timestamp and ID
    const newFeedback = {
      ...feedback,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    // Add to in-memory store
    feedbackStore.push(newFeedback)

    return NextResponse.json({
      success: true,
      feedback: newFeedback,
      message:
        "Feedback saved. Please note: In this demo, feedback is stored temporarily and will be lost on page refresh.",
    })
  } catch (error) {
    console.error("Error saving feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to save feedback" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      feedback: feedbackStore,
      message: feedbackStore.length === 0 ? "No feedback found. Submit some feedback to see it here!" : undefined,
    })
  } catch (error) {
    console.error("Error retrieving feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to retrieve feedback" }, { status: 500 })
  }
}

