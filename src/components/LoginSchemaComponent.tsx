import { z, ZodType } from 'zod'

export type LoginProps = {
    email: string,
    password: string,
    
}

export const LoginData: ZodType<LoginProps> = z.object({   
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4,{message: 'Password must be at least 4 characters'}),
    
})
