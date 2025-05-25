"use client"

import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Mail, Phone, Github, Linkedin, Globe, GraduationCap, Briefcase, FolderGit2 } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

export function TimelineTemplate() {
  const [resumeData, setResumeData] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.includes("/templates/preview")) {
      setResumeData(resumePlaceholder)
      return
    }

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
  const personalInfo = resumeData.personalInfo || {}

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 shadow-lg">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className={cn(poppins.className, "mb-2 text-4xl font-bold tracking-tight")}>
          {personalInfo.name}
        </h1>
        <p className={cn(inter.className, "mb-6 text-lg text-muted-foreground")}>{personalInfo.role}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-teal-600">
            <Mail className="h-4 w-4" />
            {personalInfo.email}
          </a>
          <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-teal-600">
            <Phone className="h-4 w-4" />
            {personalInfo.phone}
          </a>
          <a href={`https://${personalInfo.github}`} className="flex items-center gap-1 hover:text-teal-600">
            <Github className="h-4 w-4" />
            {personalInfo.github}
          </a>
          <a
            href={`https://${personalInfo.linkedin}`}
            className="flex items-center gap-1 hover:text-teal-600"
          >
            <Linkedin className="h-4 w-4" />
            {personalInfo.linkedin}
          </a>
          <a
            href={`https://${personalInfo.website}`}
            className="flex items-center gap-1 hover:text-teal-600"
          >
            <Globe className="h-4 w-4" />
            {personalInfo.website}
          </a>
        </div>
      </header>

      {/* Timeline */}
      <div className="relative">
        {/* Education Section */}
        <section className="mb-12 relative">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gray-200" />
            <h2 className={cn(poppins.className, "relative bg-white px-4 text-xl font-semibold text-teal-600")}>
              Education
            </h2>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative flex flex-col md:flex-row md:justify-center">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 md:static md:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white">
                    <GraduationCap className="h-4 w-4 text-teal-600" />
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-[calc(50%-2rem)] md:pr-8 md:text-right">
                  <h3 className={cn(poppins.className, "font-medium")}>{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </div>
                <div className="hidden w-[calc(50%-2rem)] pl-8 pt-1 text-sm text-muted-foreground md:block">
                  {edu.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12 relative">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gray-200" />
            <h2 className={cn(poppins.className, "relative bg-white px-4 text-xl font-semibold text-teal-600")}>
              Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row md:justify-center">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 md:static md:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white">
                    <Briefcase className="h-4 w-4 text-teal-600" />
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-[calc(50%-2rem)] md:pr-8 md:text-right">
                  <h3 className={cn(poppins.className, "font-medium")}>{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} • {exp.location}
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground text-left md:text-right">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden w-[calc(50%-2rem)] pl-8 pt-1 text-sm text-muted-foreground md:block">
                  {exp.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gray-200" />
            <h2 className={cn(poppins.className, "relative bg-white px-4 text-xl font-semibold text-teal-600")}>
              Projects
            </h2>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="relative flex flex-col md:flex-row md:justify-center">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 md:static md:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white">
                    <FolderGit2 className="h-4 w-4 text-teal-600" />
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-[calc(50%-2rem)] md:pr-8 md:text-right">
                  <h3 className={cn(poppins.className, "font-medium")}>{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-2 flex flex-wrap justify-start gap-2 md:justify-end">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden w-[calc(50%-2rem)] pl-8 pt-1 md:block">
                  <div className="space-y-2">
                    <h4 className={cn(poppins.className, "text-sm font-medium")}>Skills Demonstrated</h4>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>Technical proficiency in {project.technologies.join(", ")}</li>
                      <li>Project planning and execution</li>
                      <li>Problem-solving and innovation</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-12">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute left-0 right-0 h-px bg-gray-200" />
            <h2 className={cn(poppins.className, "relative bg-white px-4 text-xl font-semibold text-teal-600")}>
              Skills
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {skills.technical.concat(skills.soft).map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

