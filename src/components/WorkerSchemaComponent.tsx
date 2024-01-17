import { z, ZodType } from 'zod'

export type WorkerFormDataProps = {
    name: string,
    email: string,
    age: number,
    position: number,
    image? : any,
    imageName : string
}
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const WorkerFormData: ZodType<WorkerFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    age : z.number().min(20).max(60),
    position : z.number(),
    image : z
    .any()
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
    imageName : z.string()   
})

export type EditWorkerFormDataProps = {
    name: string,
    email: string,
    age: number,
    position: number,
    image? : any,
    imageName : string
}

export const EditWorkerFormData: ZodType<EditWorkerFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    email: z.string().email({ message: "Invalid email address" }),
    age : z.number().min(20).max(60),
    position : z.number(),
    image : z
    .any()
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ).optional(),
    imageName : z.string()   
})