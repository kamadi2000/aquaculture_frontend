import { object } from 'prop-types'
import { z, ZodType } from 'zod'

export type FishfarmFormDataProps = {
    name: string,
    latitude : number,
    longitude : number,
    cages : number,
    barge : boolean,
    image? : any,
    imageName : string

}
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const FishfarmFormData: ZodType<FishfarmFormDataProps> = z.object({
    name: z.string().min(1).max(18),
    latitude : z.number(),
    longitude : z.number(),
    cages : z.number(),
    barge : z.boolean(),
    image : z
    .any()
    .refine((file) => Object.keys(file).length !== 0, "File is required")
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.")
      ,
    imageName : z.string() 
})

// export type EditFishfarmFormDataProps = {
//     name: string,
//     latitude : number,
//     longitude : number,
//     cages : number,
//     barge : boolean,
//     image? : any,
//     imageName : string

// }

// export const EditFishfarmFormData: ZodType<EditFishfarmFormDataProps> = z.object({
//     name: z.string().min(1).max(18),
//     latitude : z.number(),
//     longitude : z.number(),
//     cages : z.number(),
//     barge : z.boolean(),
//     image : z
//     .any()
//     // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//     .refine(
//         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported.")
//       ,
//     imageName : z.string() 
// })