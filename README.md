# Portfolio Generator - AI Resume Builder

This project is a modern, AI-powered resume and portfolio website generator. It allows users to upload their existing resume, have it professionally parsed and structured by AI, and then generate a beautiful, modern resume/portfolio website using a variety of templates. The application aims to simplify and accelerate the process of creating a compelling professional presence online.

## What it Does

*   **AI-Powered Resume Parsing**: Leverages Google's Gemini AI to intelligently extract, understand, and structure information from uploaded resume files (PDF or TXT).
*   **Template-Based Generation**: Offers a selection of professional and modern templates to choose from.
*   **Content Optimization**: The AI assists in optimizing the resume content for a target role and to best fit the chosen template, keeping only the most relevant information.
*   **User Accounts & Dashboard**: New users receive credentials to access their generated content. Returning users can log in to view and manage their previously generated resumes/portfolios via a personal dashboard.
*   **Preview & Download**: Users can preview their generated resume/portfolio and (implicitly, as a common feature for such sites) download it, likely as a PDF.
*   **Responsive Design**: Built with modern web technologies for a seamless experience across devices.

## User Flow

1.  **Landing/Builder Page**: New users typically start on the builder page.
    *   Upload their existing resume (PDF or TXT file).
    *   Enter their target job role.
    *   Select a pricing plan (e.g., free, basic, premium).
    *   Choose a visual template for their resume/portfolio.
2.  **AI Processing**: The system sends the resume and user inputs to the backend.
    *   The AI (Google Gemini) extracts text from the file.
    *   Another AI call processes this text, structuring it into predefined fields (personal info, education, experience, projects, skills) and optimizing it for the selected template and target role.
3.  **Credential Generation/Login**:
    *   **New User**: If it's a new user, the system generates a unique username and password.
    *   **Existing User (Update Flow)**: If the user is updating an existing resume, they would typically be logged in, or their username would be passed to associate the new data with their account.
4.  **Data Storage**: The processed resume data, along with user credentials (for new users), selected template, target role, and pricing plan, are saved to a Firebase Realtime Database.
5.  **Outcome & Redirection**:
    *   **New User**: The user is presented with their new credentials and typically redirected to a preview of their generated resume or a dashboard.
    *   **Existing User**: The user is informed of the successful update and usually redirected to their dashboard.
6.  **Dashboard (for logged-in users)**:
    *   View account information (username, subscription plan, target role).
    *   Access their generated resume data.
    *   Options to view, update (re-upload or modify), or download their resume.
7.  **Login Page**: Returning users can log in using their credentials to access their dashboard and previously generated content.
8.  **Resume Preview**: Users can view a full preview of their generated resume/portfolio website based on the selected template and their data.

## Tech Stack

### Frontend

*   **Next.js**: React framework for server-side rendering, static site generation, and building user interfaces.
*   **React**: JavaScript library for building user interfaces.
*   **TypeScript**: Superset of JavaScript that adds static typing.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
*   **shadcn**: Re-usable UI components built with Radix UI and Tailwind CSS.
*   **Zod**: TypeScript-first schema declaration and validation library.
*   **React Hook Form**: For managing form state and validation.
*   **Lucide React**: Icon library.

### Backend (Next.js API Routes)

*   **Next.js API Routes**: Used to create backend endpoints for login, user data retrieval, and resume parsing.
*   **Google Generative AI SDK for Node.js (`@google/generative-ai`)**: To interact with Google's Gemini models for:
    *   Text extraction from PDFs (using File API and models like `gemini-2.5-flash-preview-05-20`).
    *   Resume content parsing, structuring, and optimization (using models like `gemini-1.5-flash-latest` or `gemini-2.5-flash-preview-05-20`).
*   **Firebase SDK for Node.js (`firebase/database`)**: For interacting with Firebase Realtime Database to store and retrieve user data and resume information.

### Database

*   **Firebase Realtime Database**: NoSQL cloud database to store user credentials, resume data, and selected preferences.

### AI & Services

*   **Google Gemini API**: Core AI service for resume parsing and content generation/optimization.
*   **Google AI File Service**: Used via the `GoogleAIFileManager` for uploading and referencing files (like PDFs) when interacting with Gemini models.

### Environment & Deployment

*   **Vercel**: Likely platform for deploying Next.js applications.

### Development Tools

*   **ESLint**: For code linting.
*   **pnpm**: Package manager.

## Sample User ID and Password
- **User ID:** `iioWeFES`
- **Password:** `hX9BkqjR`