import { z, ZodType } from 'zod'

export type ClientFormDataProps = {
    name: string,
    email: string,
}

export const ClientFormData: ZodType<ClientFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
})

export type EditClientFormDataProps = {
    name: string,
    email: string,
}

export const EditAdminFormData: ZodType<EditClientFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
})