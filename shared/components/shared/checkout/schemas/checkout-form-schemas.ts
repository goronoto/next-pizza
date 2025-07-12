import {z} from 'zod'

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2,{message: 'Name should contain at least 2 character'}),
    lastName: z.string().min(2,{message: 'Last name should contain at least 2 character'}),
    email: z.string().email({message:'enter a valid email'}),
    phone: z.string().min(10,{message:'enter a valid phone number'}),
    address: z.string().min(5,{message:'enter a valid address'}),
    comment: z.string().optional()
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>