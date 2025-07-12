import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TFormLoginValue } from './schema'
import { Title } from '../../title'
import { FormInput } from '../../form-components/form-input'
import { Button } from '@/shared/components/ui'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

interface Props {
    onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> =({onClose}) => {
    const form = useForm<TFormLoginValue>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit = async (data:TFormLoginValue) => {
        try {
            const resp = await signIn('credentials',{
                ...data,
                redirect:false
            })

            if(!resp?.ok){
                throw Error()
            }

            toast.success('Successfully log in to the account',{
                icon: '✅'
            })

            onClose?.()
        } catch (error) {
            console.error('Error [LOGIN]',error);
            toast.error('Failed to log in to the account',{
                icon: '❌',
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text='Sign in ' size='md' className='font-bold'/>
                        <p className='text-gray-400'>Enter your email to sign into your account</p>
                    </div>
                    <img src='/assets/images/phone-icon.png' alt='phone-icon' width={60} height={60} />
                </div>

                <FormInput name='email' label='E-mail' required/>
                <FormInput name='password' label='Password' type='password' required/>

                <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
                    Log in
                </Button>

            </form>
        </FormProvider>
    )
}