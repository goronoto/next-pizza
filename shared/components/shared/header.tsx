'use client'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container,SearchInput } from './index'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { ProfileButton } from './profile.button'
import { AuthModal } from './modals/auth-modal/auth-modal'
import { useSearchParam } from 'react-use'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props {
    classname?:string
    hasSearch?:boolean
    hasCart?:boolean
}

export const Header: React.FC<Props> =({classname,hasSearch = true,hasCart = true}) => {
    const [openAuthModal,setOpenAuthModal] = React.useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    React.useEffect(() => {
        let toastMessage = ''

        if(searchParams?.has('paid')){
            toastMessage = 'E-mail is successfully verified'
        }

        if(toastMessage){
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage,{
                    duration:3000
                })
            },1000)
        }

    },[])

    return (
        <header className={cn(' border-b ', classname)}>
            <Container className="flex items-center justify-between py-8">
                {/*LEFT SIDE*/}
                <Link href='/'>
                    <div className="flex items-center gap-4">
                        <Image src='/logo.png' alt='logo' width={32} height={32}/>
                    <div className="">
                        <h1 className='text-2xl uppercase font-black'>next pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>simply the best</p>
                    </div>
                </div>
                </Link>

                {hasSearch && <div className="mx-10 flex-1">
                    <SearchInput/>
                </div>}

                {/*RIGHT SIDE*/}
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false )} />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>
                    {hasCart && <CartButton/>}
                </div>  
            </Container>
        </header>
    )
}