"use client"

import { poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Mail, Phone, Github, GraduationCap, Briefcase, Star, Code, Users, Brain, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import resumePlaceholder from "@/data/resume-placeholder.json"

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <Progress value={level} />
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border bg-white p-4 shadow-sm transition-colors hover:border-teal-500">
      <div className="mb-2 rounded-full bg-orange-100 p-2">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

export function InfographicTemplate() {
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

  // Calculate years of experience
  const yearsOfExperience = experience.reduce((acc: number, exp: any) => {
    const start = new Date(exp.date.split(" - ")[0])
    const end = exp.date.includes("Present") ? new Date() : new Date(exp.date.split(" - ")[1])
    return acc + (end.getFullYear() - start.getFullYear())
  }, 0)

  // Calculate number of projects
  const numberOfProjects = projects.length

  // Calculate total technologies
  const totalTechnologies = new Set(
    projects.flatMap((project: any) => project.technologies).concat(skills.technical),
  ).size

  return (
    <div className="mx-auto max-w-4xl space-y-8 bg-gray-50 p-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-400 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Replace image with initials avatar */}
            <div className="flex h-32 w-32 items-center justify-center rounded-xl border-4 border-white/20 bg-white/10 text-4xl font-bold text-white">
              {`${personalInfo.name?.split(" ")[0][0] || ""}${personalInfo.name?.split(" ")[1][0] || ""}`}
            </div>
            <div className="text-center md:text-left">
              <h1 className={cn(poppins.className, "mb-2 text-4xl font-bold tracking-tight")}>
                {personalInfo.name || ""}
              </h1>
              <p className={cn(inter.className, "mb-4 text-xl text-white/90")}>{personalInfo.role || ""}</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-start">
                <a
                  href={`mailto:${personalInfo.email || ""}`}
                  className="flex items-center gap-1 hover:text-white/80"
                >
                  <Mail className="h-4 w-4" />
                  {personalInfo.email || ""}
                </a>
                <a
                  href={`tel:${personalInfo.phone || ""}`}
                  className="flex items-center gap-1 hover:text-white/80"
                >
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone || ""}
                </a>
                <a
                  href={`https://${personalInfo.github || ""}`}
                  className="flex items-center gap-1 hover:text-white/80"
                >
                  <Github className="h-4 w-4" />
                  {personalInfo.github || ""}
                </a>
              </div>
            </div>
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

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Briefcase} label="Years Experience" value={`${yearsOfExperience}+`} />
        <StatCard icon={Star} label="Projects" value={numberOfProjects.toString()} />
        <StatCard icon={Code} label="Technologies" value={totalTechnologies.toString()} />
        <StatCard icon={CheckCircle2} label="Success Rate" value="100%" />
      </div>

      {/* Skills Section */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className={cn(poppins.className, "mb-6 text-2xl font-semibold text-gray-900")}>Skills & Expertise</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className={cn(poppins.className, "mb-4 font-medium text-gray-900")}>Technical Proficiency</h3>
            {skills.technical.slice(0, 5).map((skill, index) => (
              <SkillBar
                key={skill}
                name={skill}
                level={Math.floor(Math.random() * (95 - 75 + 1)) + 75} // Random value between 75-95 for demo
              />
            ))}
          </div>
          <div>
            <h3 className={cn(poppins.className, "mb-4 font-medium text-gray-900")}>Core Competencies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.soft.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-lg border bg-gray-50 p-3 text-sm transition-colors hover:border-orange-200 hover:bg-orange-50"
                >
                  <Brain className="h-4 w-4 text-orange-500" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className={cn(poppins.className, "mb-6 text-2xl font-semibold text-gray-900")}>Professional Journey</h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                {index !== experience.length - 1 && <div className="h-full w-px bg-orange-200" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={cn(poppins.className, "font-medium text-gray-900")}>{exp.role}</h3>
                  <span className="text-sm text-orange-600">{exp.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exp.company} • {exp.location}
                </p>
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className={cn(poppins.className, "mb-6 text-2xl font-semibold text-gray-900")}>Featured Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-gray-50 to-white p-4 transition-all hover:border-teal-500"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className={cn(poppins.className, "font-medium text-gray-900")}>{project.name}</h3>
                <Users className="h-4 w-4 text-teal-500" />
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-teal-50 px-2 py-1 text-xs text-teal-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className={cn(poppins.className, "mb-6 text-2xl font-semibold text-gray-900")}>Education</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((edu, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border bg-gray-50 p-4 transition-colors hover:border-orange-200 hover:bg-orange-50"
            >
              <div className="rounded-full bg-orange-100 p-2">
                <GraduationCap className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className={cn(poppins.className, "font-medium text-gray-900")}>{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-orange-600">
                  <span>{edu.location}</span>
                  <span>•</span>
                  <span>{edu.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

