import { NextRequest, NextResponse } from "next/server";
import { ref, get, set } from "firebase/database";
import { database } from "@/lib/firebase";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server"; // Added for file management
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os'; // Added for temporary directory

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY environment variable is not set");
}
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;
const fileManager = GOOGLE_API_KEY ? new GoogleAIFileManager(GOOGLE_API_KEY) : null; // Added FileManager instance

// Helper function to generate random credentials
function generateCredentials() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generateString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return { username: generateString(8), password: generateString(8) };
}

// Helper function to get user data from Firebase
async function getUserData(username: string): Promise<any | null> {
  try {
    const userRef = ref(database, `Users/${username}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error(`Error getting user data from Firebase for ${username}:`, error);
    return null;
  }
}

// Helper function to extract text from a PDF file using Gemini
async function extractTextFromPdfWithGemini(fileBuffer: Buffer, filename: string): Promise<string> {
  if (!genAI || !fileManager) { // Check for fileManager as well
    throw new Error("Google AI SDK or FileManager not initialized. Check GOOGLE_API_KEY.");
  }
  // Use the user-specified model
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

  let tempFilePath = "";
  let uploadResult;

  try {
    // Create a temporary file to upload
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-pdf-'));
    tempFilePath = path.join(tempDir, filename);
    fs.writeFileSync(tempFilePath, fileBuffer);

    // Upload the file
    console.log(`Uploading temporary file for Gemini: ${tempFilePath}`);
    uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: "application/pdf",
      displayName: `resume-${filename}`,
    });
    console.log(`Completed upload to Gemini: ${uploadResult.file.uri}`);

    const fileInputPart: Part = {
      fileData: {
        mimeType: uploadResult.file.mimeType,
        fileUri: uploadResult.file.uri,
      },
    };

    const prompt = "Extract all text content from the provided PDF document. Focus on extracting the textual information accurately.";
    
    const generationConfig = {
      temperature: 0.1, // Lower temperature for more deterministic extraction
    };

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [ {text: prompt}, fileInputPart] }],
        generationConfig,
    });
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error(`Error extracting text from ${filename} using Gemini with File API:`, error);
    throw new Error(`Error extracting text from ${filename} using Gemini with File API`);
  } finally {
    // Clean up: delete the temporary local file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
        fs.rmdirSync(path.dirname(tempFilePath)); // Remove the temporary directory
        console.log(`Deleted temporary local file: ${tempFilePath}`);
      } catch (cleanupError) {
        console.error(`Error deleting temporary local file ${tempFilePath}:`, cleanupError);
      }
    }
    // Clean up: delete the file from Google's service
    if (uploadResult && uploadResult.file && uploadResult.file.name) {
      try {
        await fileManager.deleteFile(uploadResult.file.name);
        console.log(`Deleted file from Google service: ${uploadResult.file.name}`);
      } catch (deleteError) {
        console.error(`Error deleting file ${uploadResult.file.name} from Google service:`, deleteError);
      }
    }
  }
}

// Helper function to process resume text with Gemini
async function processResumeWithGemini(resumeText: string, templateName: string, targetRole: string): Promise<any> {
  if (!genAI) throw new Error("Google AI SDK not initialized. Check GOOGLE_API_KEY.");
  // Model name from Python: 'gemini-2.5-flash-preview-04-17', but Node SDK might prefer 'gemini-1.5-flash-latest'
  // Let's use a generally available model, adjust if specific version is critical and available.
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

  const prompt = `
    You are a professional resume parser. Extract structured information from the following resume text.
    Format the output as a JSON object with the following structure:
    
    {
        "personalInfo": {
            "name": "Full Name",
            "role": "Professional Title",
            "email": "email@example.com",
            "phone": "Phone Number",
            "github": "GitHub Username/URL (if available)",
            "linkedin": "LinkedIn Username/URL (if available)",
            "website": "Personal Website (if available)",
            "photo": "/placeholder.svg?height=400&width=400"
        },
        "education": [
            {
                "degree": "Degree Name",
                "school": "School Name",
                "location": "Location",
                "date": "Date Range"
            }
        ],
        "experience": [
            {
                "role": "Job Title",
                "company": "Company Name",
                "location": "Location",
                "date": "Date Range",
                "achievements": [
                    "Achievement 1",
                    "Achievement 2",
                    "Achievement 3"
                ]
            }
        ],
        "projects": [
            {
                "name": "Project Name",
                "description": "Project Description",
                "technologies": ["Technology 1", "Technology 2", "Technology 3"]
            }
        ],
        "skills": {
            "technical": ["Skill 1", "Skill 2", "Skill 3"],
            "soft": ["Soft Skill 1", "Soft Skill 2", "Soft Skill 3"]
        }
    }
    
    The user has selected the ${templateName} template. Optimize the content to look good with this template. Improve the written content for the role of ${targetRole} and make it more appealing for ${targetRole} role.
    Keep only 3 relevant projects and 3 relevant experiences. Remove any irrelevant information.
    If the resume text is empty or not provided, return an empty JSON object.
    Resume Text:
    ${resumeText}
    
    Return ONLY the JSON object with no additional text or explanation.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    let responseText = response.text();

    if (!responseText && resumeText.trim() === "") {
        return {}; // Return empty JSON object as per prompt instruction
    }
    
    // Clean up the response to get pure JSON
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      responseText = jsonMatch[1].trim();
    } else if (responseText.startsWith("{") && responseText.endsWith("}")) {
      // It might be a plain JSON without backticks
      // No action needed, it's already likely JSON
    } else {
      // Fallback if no clear JSON structure is found but text exists
      if (resumeText.trim() === "") return {}; // If original text was empty, return empty
      console.warn("Gemini response for resume processing was not clean JSON:", responseText);
      throw new Error("Could not parse structured data from resume.");
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error processing resume with Gemini:", error);
    if (resumeText.trim() === "") return {}; // Still return empty if original text was empty
    throw new Error("Error processing resume with Gemini");
  }
}

// Helper function to save data to Firebase
async function saveToFirebase(username: string, password?: string, targetRole?: string, pricing?: string, template?: string, resumeData?: any): Promise<boolean> {
  try {
    const firebaseData: any = {
      "Target Role": targetRole,
      pricing: pricing,
      template: template,
      "file data": {
        personalInfo: {
          name: resumeData?.personalInfo?.name || "",
          role: targetRole || resumeData?.personalInfo?.role || "",
          email: resumeData?.personalInfo?.email || "",
          phone: resumeData?.personalInfo?.phone || "",
          github: resumeData?.personalInfo?.github || "",
          linkedin: resumeData?.personalInfo?.linkedin || "",
          website: resumeData?.personalInfo?.website || "",
          photo: resumeData?.personalInfo?.photo || "/placeholder.svg?height=400&width=400",
        },
        education: resumeData?.education || [],
        experience: resumeData?.experience || [],
        projects: resumeData?.projects || [],
        skills: resumeData?.skills || { technical: [], soft: [] },
        template: template,
      },
    };
    // Only add password if it's a new user or password needs to be set/updated
    if (password) {
      firebaseData.Password = password;
    }

    const userRef = ref(database, `Users/${username}`);
    await set(userRef, firebaseData);
    return true;
  } catch (error) {
    console.error(`Error saving to Firebase for ${username}:`, error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!genAI) {
    return NextResponse.json({ success: false, message: "Google AI SDK not initialized. Check GOOGLE_API_KEY." }, { status: 500 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const template = formData.get("template") as string || "default";
    const target_role = formData.get("target_role") as string || "";
    const pricing = formData.get("pricing") as string || "free";
    let username = formData.get("username") as string | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "File is required." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.toLowerCase();
    let resume_text = "";

    if (filename.endsWith(".pdf")) {
      resume_text = await extractTextFromPdfWithGemini(fileBuffer, file.name);
    } else if (filename.endsWith(".txt")) {
      resume_text = fileBuffer.toString("utf-8");
    } else {
      return NextResponse.json({ success: false, message: "Unsupported file format. Please upload a PDF or TXT file." }, { status: 400 });
    }

    const processedResumeData = await processResumeWithGemini(resume_text, template, target_role);

    let generatedCredentials: { username: string; password?: string } | null = null;
    let userPasswordToSave: string | undefined = undefined;

    if (username) {
      const existingUserData = await getUserData(username);
      if (!existingUserData) {
        return NextResponse.json({ success: false, message: "User not found. Cannot update resume for non-existent user unless new credentials are generated." }, { status: 404 });
      }
      userPasswordToSave = existingUserData.Password; // Keep existing password
      generatedCredentials = { username }; // No new password needed for existing user display
    } else {
      const creds = generateCredentials();
      username = creds.username;
      userPasswordToSave = creds.password;
      generatedCredentials = creds;
    }

    const firebaseSuccess = await saveToFirebase(
      username!,
      userPasswordToSave,
      target_role,
      pricing,
      template,
      processedResumeData
    );

    // Save a local backup
    const backupData = { ...processedResumeData, template };
    const outputFolderPath = path.join(process.cwd(), "data");
    const outputFilePath = path.join(outputFolderPath, "resume-backup.json");
    try {
      if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
      }
      fs.writeFileSync(outputFilePath, JSON.stringify(backupData, null, 2));
    } catch (writeError) {
      console.warn(`Warning: Could not write backup to ${outputFilePath}:`, writeError);
      // Do not fail the request if backup write fails
    }

    return NextResponse.json({
      success: true,
      message: "Resume processed successfully",
      data: processedResumeData,
      credentials: generatedCredentials, // Return username, and password if newly generated
      firebase_saved: firebaseSuccess,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error in /parse-resume endpoint:", error);
    return NextResponse.json({ success: false, message: error.message || "Error processing resume" }, { status: 500 });
  }
}
