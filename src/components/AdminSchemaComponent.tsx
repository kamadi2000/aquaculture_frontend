import { z, ZodType } from 'zod'

export type AdminFormDataProps = {
    name: string,
    email: string,
    password: string,
    rPassword: string,
    role: string
}

export const AdminFormData: ZodType<AdminFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4),
    rPassword: z.string().min(4),
    role: z.string({
        errorMap:() => {
            return {message : "You have to select a role"}
        }
    })
}).superRefine(({password, rPassword},ctx) => {
    if (password !== rPassword) {
        ctx.addIssue({
            code : z.ZodIssueCode.custom,
            message : "Passwords do not match",
            path : ["rPassword"]
        })
    }
})

export type EditAdminFormDataProps = {
    name: string,
    email: string,
    role: string
}

export const EditAdminFormData: ZodType<EditAdminFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.string({
        errorMap:() => {
            return {message : "You have to select a role"}
        }
    })
})