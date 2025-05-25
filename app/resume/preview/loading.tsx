export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent mx-auto"></div>
        <p>Loading your resume...</p>
      </div>
    </div>
  )
}

