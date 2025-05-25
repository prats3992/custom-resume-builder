import { database } from "@/lib/firebase"
import { ref, set, get } from "firebase/database"

export async function saveResume(userId: string, data: any) {
  if (!database) {
    throw new Error("Firebase database is not initialized")
  }

  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    // Validate database URL
    if (!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) {
      throw new Error("Firebase database URL is not configured")
    }

    const resumeRef = ref(database, `Users/${userId}`)

    await set(resumeRef, data)
    return { success: true, data }
  } catch (error) {
    console.error("Firebase save error details:", {
      error,
      userId,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      isDatabaseInitialized: !!database,
    })
    throw new Error(`Failed to save resume: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function getResume(userId: string) {
  if (!database) {
    throw new Error("Firebase database is not initialized")
  }

  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    const resumeRef = ref(database, `Users/${userId}`)
    const snapshot = await get(resumeRef)

    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() }
    }
    return { success: false, error: "Resume not found" }
  } catch (error) {
    console.error("Firebase fetch error details:", {
      error,
      userId,
      isDatabaseInitialized: !!database,
    })
    throw new Error(`Failed to fetch resume: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

