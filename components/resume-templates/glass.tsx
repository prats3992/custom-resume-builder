"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

export function GlassTemplate() {
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
  const personalInfo = resumeData.personalInfo || {
    name: "Your Name",
    role: "Your Role",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  }

  return (
    <div className="font-sans">
      {/* Header with glass effect */}
      <header className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-blue-900">{personalInfo.name}</h1>
            <p className="text-lg text-blue-700">{personalInfo.role}</p>
          </div>
          <div className="mt-4 text-right text-blue-800 md:mt-0">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.github && <p>{personalInfo.github}</p>}
            {personalInfo.website && <p>{personalInfo.website}</p>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid gap-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="mb-4 inline-block border-b-2 border-blue-400 pb-1 text-xl font-semibold text-blue-900">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex flex-col justify-between md:flex-row">
                    <h3 className="font-medium text-blue-800">{exp.role || "Role"}</h3>
                    <span className="text-sm text-blue-600">{exp.date || "Date"}</span>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <p className="text-sm font-medium">{exp.company || "Company"}</p>
                    <p className="text-sm text-gray-600">{exp.location || "Location"}</p>
                  </div>
                  <ul className="mt-2 list-inside list-disc text-sm">
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
            <h2 className="mb-4 inline-block border-b-2 border-blue-400 pb-1 text-xl font-semibold text-blue-900">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex flex-col justify-between md:flex-row">
                    <h3 className="font-medium text-blue-800">{edu.degree || "Degree"}</h3>
                    <span className="text-sm text-blue-600">{edu.date || "Date"}</span>
                  </div>
                  <div className="flex flex-col justify-between md:flex-row">
                    <p className="text-sm font-medium">{edu.school || "School"}</p>
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
            <h2 className="mb-4 inline-block border-b-2 border-blue-400 pb-1 text-xl font-semibold text-blue-900">
              Skills
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {skills.technical.length > 0 && (
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-2 font-medium text-blue-800">Technical</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill: string, index: number) => (
                      <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-2 font-medium text-blue-800">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill: string, index: number) => (
                      <span key={index} className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="mb-4 inline-block border-b-2 border-blue-400 pb-1 text-xl font-semibold text-blue-900">
              Projects
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project: any, index: number) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="font-medium text-blue-800">{project.name || "Project Name"}</h3>
                  <p className="mt-1 text-sm">{project.description || "Project Description"}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(project.technologies || []).map((tech: string, i: number) => (
                      <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

