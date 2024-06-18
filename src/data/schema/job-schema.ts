import { z } from "zod";

export const jobSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        message: "Please fill Job Listing Name form!",
      })
      .default(""),
    type: z
      .string()
      .min(1, {
        message: "Please select Job Type!",
      })
      .default(""),
    description: z
      .string()
      .min(1, {
        message: "Please fill Description form!",
      })
      .default(""),
    location: z
      .string()
      .min(1, {
        message: "Please fill Location form!",
      })
      .default(""),
    salary: z
      .string()
      .min(1, {
        message: "Please fill Description form!",
      })
      .default(""),
    company: z
      .object({
        name: z
          .string()
          .min(1, {
            message: "Please fill Company Name form!",
          })
          .default(""),
        description: z
          .string()
          .min(1, {
            message: "Please fill Company Description form!",
          })
          .default(""),
        contactEmail: z
          .string()
          .min(1, {
            message: "Please fill Company Email form!",
          })
          .email()
          .default(""),
        contactPhone: z
          .string()
          .min(1, {
            message: "Please fill Company Phone form!",
          })
          .min(10, {
            message: "Invalid phone number!",
          })
          .default(""),
      })
      .default({}),
  })
  .default({});
