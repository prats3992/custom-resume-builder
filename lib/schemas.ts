import { z } from "zod"

// Define the template schema
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  preview: z.string(),
})

// Define the resume data schema that will be returned from the API
export const resumeDataSchema = z.object({
  personalInfo: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        gpa: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  workExperience: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  skills: z.array(z.string()).optional(),
  projects: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        technologies: z.array(z.string()).optional(),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }),
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string().optional(),
        date: z.string().optional(),
        url: z.string().optional(),
      }),
    )
    .optional(),
  languages: z
    .array(
      z.object({
        language: z.string(),
        proficiency: z.string().optional(),
      }),
    )
    .optional(),
  summary: z.string().optional(),
  template: z.string(),
  selectedTemplate: templateSchema,
})

export type ResumeData = z.infer<typeof resumeDataSchema>

