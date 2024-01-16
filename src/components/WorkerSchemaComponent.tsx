import { z, ZodType } from 'zod'

export type WorkerFormDataProps = {
    name: string,
    email: string,
    age: number,
    imageName: string,
    imageFile? : any,
    position: string,
    imageSrc?: string
}

export const WorkerFormData: ZodType<WorkerFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    age : z.number().min(20).max(60),
    imageName : z.string(),
    imageFile : z.any().optional(),
    position : z.string(),
    imageSrc : z.string().optional()
})

export type EditWorkerFormDataProps = {
    name: string,
    email: string,
    age: number,
    imageName: string,
    imageFile? : any,
    position: string,
    imageSrc?: string
}

export const EditWorkerFormData: ZodType<EditWorkerFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    age : z.number().min(20).max(60),
    imageName : z.string(),
    imageFile : z.any().optional(),
    position : z.string(),
    imageSrc : z.string().optional()
})