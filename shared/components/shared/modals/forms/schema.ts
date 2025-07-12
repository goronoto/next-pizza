import {z} from 'zod'

export const passwordSchema = z.string().min(4,{message:'Enter a valid password'})

export const FormLoginSchema = z.object({
    email: z.string().email({message: 'Enter a valid E-mail'}),
    password: passwordSchema
})

export const FormRegisterSchema = FormLoginSchema.merge(
    z.object({
        fullName: z.string().min(2,{message:'Enter your first & last name'}),
        confirmPassword: passwordSchema
    })
).refine(data => data.password === data.confirmPassword,{
    message:'Passwords are not matching',
    path:['confirmPassword']
})

export type TFormLoginValue = z.infer<typeof FormLoginSchema>
export type TFormRegisterValue = z.infer<typeof FormRegisterSchema>