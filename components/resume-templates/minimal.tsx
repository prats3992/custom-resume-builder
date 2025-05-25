"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

export function MinimalTemplate() {
  const [resumeData, setResumeData] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    // If we're on the template preview page, use the placeholder data
    if (pathname?.includes("/templates/preview")) {
      setResumeData(resumePlaceholder)
      return
    }

    // Otherwise, get the resume data from localStorage
    const storedData = localStorage.getItem("resumeData")
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    }
  }, [pathname])

  if (!resumeData) {
    return <div>Loading resume data...</div>
  }

  // Ensure all arrays exist with default empty arrays
  const education = resumeData.education || []
  const experience = resumeData.experience || []
  const projects = resumeData.projects || []
  const skills = {
    technical: resumeData.skills?.technical || [],
    soft: resumeData.skills?.soft || [],
  }

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">{resumeData.personalInfo?.name || "Your Name"}</h1>
        <p className="mb-2 text-lg">{resumeData.personalInfo?.role || "Your Role"}</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {resumeData.personalInfo?.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo?.phone && <span>• {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo?.linkedin && <span>• {resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo?.github && <span>• {resumeData.personalInfo.github}</span>}
          {resumeData.personalInfo?.website && <span>• {resumeData.personalInfo.website}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="mb-3 border-b border-gray-300 pb-1 text-xl font-semibold">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.role || "Role"}</h3>
                    <span className="text-sm text-gray-600">{exp.date || "Date"}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">{exp.company || "Company"}</p>
                    <p className="text-sm text-gray-600">{exp.location || "Location"}</p>
                  </div>
                  <ul className="mt-1 list-inside list-disc text-sm">
                    {(exp.achievements || []).map((achievement: string, i: number) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="mb-3 border-b border-gray-300 pb-1 text-xl font-semibold">Education</h2>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.degree || "Degree"}</h3>
                    <span className="text-sm text-gray-600">{edu.date || "Date"}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">{edu.school || "School"}</p>
                    <p className="text-sm text-gray-600">{edu.location || "Location"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <section>
            <h2 className="mb-3 border-b border-gray-300 pb-1 text-xl font-semibold">Skills</h2>
            <div className="grid gap-2 md:grid-cols-2">
              {skills.technical.length > 0 && (
                <div>
                  <h3 className="font-medium">Technical</h3>
                  <p className="text-sm">{skills.technical.join(", ")}</p>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h3 className="font-medium">Soft Skills</h3>
                  <p className="text-sm">{skills.soft.join(", ")}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="mb-3 border-b border-gray-300 pb-1 text-xl font-semibold">Projects</h2>
            <div className="space-y-4">
              {projects.map((project: any, index: number) => (
                <div key={index}>
                  <h3 className="font-medium">{project.name || "Project Name"}</h3>
                  <p className="text-sm">{project.description || "Project Description"}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="mt-1 text-xs text-gray-600">Technologies: {project.technologies.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

