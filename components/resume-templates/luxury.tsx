"use client"

import { poppins, playfair, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Mail, Phone, Github, Linkedin, Globe, MapPin, Calendar, Award, Briefcase, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

export function LuxuryTemplate() {
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
    <div className="min-h-screen bg-navy-900">
      <div className="mx-auto max-w-5xl space-y-8 p-8">
        {/* Header */}
        <header className="grid gap-8 rounded-lg border border-amber-300/20 bg-navy-800/50 p-8 md:grid-cols-[200px_1fr]">
          <div className="relative mx-auto aspect-square h-48 w-48 overflow-hidden rounded-lg border-2 border-amber-300/20 bg-navy-800 flex items-center justify-center">
            <span className="text-5xl font-bold text-amber-300">
              {`${personalInfo.name?.split(" ")[0]?.[0] || ""}${personalInfo.name?.split(" ")[1]?.[0] || ""}`}
            </span>
          </div>
          <div>
            <h1 className={cn(playfair.className, "mb-2 text-4xl font-bold tracking-tight text-amber-300")}>
              {personalInfo.name}
            </h1>
            <p className={cn(inter.className, "mb-6 text-xl text-white/90")}>{personalInfo.role}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-amber-300"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-amber-300"
              >
                <Phone className="h-4 w-4" />
                {personalInfo.phone}
              </a>
              <a
                href={`https://${personalInfo.github}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-amber-300"
              >
                <Github className="h-4 w-4" />
                {personalInfo.github}
              </a>
              <a
                href={`https://${personalInfo.linkedin}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-amber-300"
              >
                <Linkedin className="h-4 w-4" />
                {personalInfo.linkedin}
              </a>
              <a
                href={`https://${personalInfo.website}`}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-amber-300"
              >
                <Globe className="h-4 w-4" />
                {personalInfo.website}
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Experience */}
            <section className="rounded-lg border border-amber-300/20 bg-navy-800/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-300" />
                <h2 className={cn(playfair.className, "text-2xl font-semibold text-amber-300")}>Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative border-l border-amber-300/20 pl-6 before:absolute before:-left-[3px] before:top-[6px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber-300"
                  >
                    <h3 className={cn(poppins.className, "font-medium text-white")}>{exp.role}</h3>
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
                      <span>{exp.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-300/70" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-amber-300/70" />
                        {exp.date}
                      </span>
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-sm text-white/80">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="rounded-lg border border-amber-300/20 bg-navy-800/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-300" />
                <h2 className={cn(playfair.className, "text-2xl font-semibold text-amber-300")}>Projects</h2>
              </div>
              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className={cn(poppins.className, "font-medium text-white")}>{project.name}</h3>
                    <p className="text-sm text-white/80">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-amber-300/20 bg-navy-700/50 px-3 py-1 text-xs text-amber-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}
            <section className="rounded-lg border border-amber-300/20 bg-navy-800/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-300" />
                <h2 className={cn(playfair.className, "text-2xl font-semibold text-amber-300")}>Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative border-l border-amber-300/20 pl-6 before:absolute before:-left-[3px] before:top-[6px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber-300"
                  >
                    <h3 className={cn(poppins.className, "font-medium text-white")}>{edu.degree}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
                      <span>{edu.school}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-300/70" />
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-amber-300/70" />
                        {edu.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-lg border border-amber-300/20 bg-navy-800/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-300" />
                <h2 className={cn(playfair.className, "text-2xl font-semibold text-amber-300")}>Skills</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className={cn(poppins.className, "mb-3 font-medium text-white")}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-amber-300/20 bg-navy-700/50 px-3 py-1 text-sm text-amber-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={cn(poppins.className, "mb-3 font-medium text-white")}>Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-amber-300/20 bg-navy-700/50 px-3 py-1 text-sm text-amber-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

