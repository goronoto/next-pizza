import { prisma } from '@/prisma/prisma-client';
import { VerificationCode } from './../../../../node_modules/.prisma/client/index.d';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const code = req.nextUrl.searchParams.get('code')

        if(!code){
            return NextResponse.json({error:'Wrong code'},{status:400})
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where:{
                code
            }
        })

        if(!verificationCode){
            return NextResponse.json({error:'Wrong code'},{status:400})
        }

        await prisma.user.update({
            where:{
                id:verificationCode.id
            },
            data:{
                verified:new Date()
            }
        })

        await prisma.verificationCode.delete({
            where:{
                id:verificationCode.id
            }
        })

        return NextResponse.redirect(new URL('/?verified',req.url))

    } catch (error) {
        console.log(error);
        console.log('[VERIFY_GET] Error',error);
    }
}