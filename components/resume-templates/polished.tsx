"use client"

import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Mail, Phone, Github, Linkedin, Globe, MapPin, Calendar, Award, BookOpen, Target, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-900">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <Progress value={level} className="h-1.5" />
    </div>
  )
}

export function PolishedTemplate() {
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
    <div className="mx-auto max-w-[1100px] bg-white shadow-xl">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-12 text-white">
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 bg-violet-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {`${personalInfo.name?.split(" ")[0]?.[0] || ""}${personalInfo.name?.split(" ")[1]?.[0] || ""}`}
              </span>
            </div>
            <h1 className={cn(poppins.className, "mb-2 text-4xl font-bold tracking-tight")}>
              {personalInfo.name || ""}
            </h1>
            <p className={cn(inter.className, "mb-4 text-xl text-white/90")}>{personalInfo.role || ""}</p>
            <p className="max-w-2xl text-white/80">
              Passionate and results-driven professional with expertise in modern web technologies and a proven track
              record of delivering innovative solutions.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.1) 30%, transparent 31%), radial-gradient(circle at 80% -50%, rgba(255, 255, 255, 0.1) 20%, transparent 21%)",
            backgroundSize: "60px 60px",
          }}
        />
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
        {/* Left Column - Contact & Skills */}
        <div className="space-y-8">
          {/* Contact Information */}
          <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-lg font-semibold text-gray-900")}>
              <User className="h-5 w-5 text-violet-600" />
              Contact Information
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email || ""}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-violet-600"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email || ""}
              </a>
              <a
                href={`tel:${personalInfo.phone || ""}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-violet-600"
              >
                <Phone className="h-4 w-4" />
                {personalInfo.phone || ""}
              </a>
              <a
                href={`https://${personalInfo.github || ""}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-violet-600"
              >
                <Github className="h-4 w-4" />
                {personalInfo.github || ""}
              </a>
              <a
                href={`https://${personalInfo.linkedin || ""}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-violet-600"
              >
                <Linkedin className="h-4 w-4" />
                {personalInfo.linkedin || ""}
              </a>
              <a
                href={`https://${personalInfo.website || ""}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-violet-600"
              >
                <Globe className="h-4 w-4" />
                {personalInfo.website || ""}
              </a>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-lg font-semibold text-gray-900")}>
              <Target className="h-5 w-5 text-violet-600" />
              Technical Skills
            </h2>
            <div className="space-y-3">
              {skills.technical.map((skill, index) => (
                <SkillBar
                  key={skill}
                  name={skill}
                  level={Math.floor(Math.random() * (95 - 75 + 1)) + 75} // Random value between 75-95 for demo
                />
              ))}
            </div>
          </section>

          {/* Soft Skills */}
          <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-lg font-semibold text-gray-900")}>
              <BookOpen className="h-5 w-5 text-violet-600" />
              Soft Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill) => (
                <span key={skill} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-600">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Center Column - Experience & Projects */}
        <div className="space-y-8 md:col-span-2">
          {/* Work Experience */}
          <section className="space-y-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-xl font-semibold text-gray-900")}>
              <Award className="h-6 w-6 text-violet-600" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4">
                    <h3 className={cn(poppins.className, "text-lg font-medium text-gray-900")}>{exp.role}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.date}
                      </span>
                    </div>
                  </div>
                  <ul className="ml-4 list-disc space-y-2 text-sm text-gray-600">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-xl font-semibold text-gray-900")}>
              <Award className="h-6 w-6 text-violet-600" />
              Featured Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className={cn(poppins.className, "mb-2 text-lg font-medium text-gray-900")}>{project.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-violet-50 px-2 py-1 text-xs font-medium text-violet-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-6">
            <h2 className={cn(poppins.className, "flex items-center gap-2 text-xl font-semibold text-gray-900")}>
              <Award className="h-6 w-6 text-violet-600" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className={cn(poppins.className, "text-lg font-medium text-gray-900")}>{edu.degree}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{edu.school}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edu.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {edu.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

