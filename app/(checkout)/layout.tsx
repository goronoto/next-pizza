import { Metadata } from "next"
import { Container, Header } from '@/shared/components/shared';

export const metadata:Metadata = {
  title: 'Next Pizza | Cart',
  description: 'Generated by Next.js',
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
        <Container>
            <Header hasCart={false} classname="border-gray-200" hasSearch={false}/>
            {children}
        </Container>
    </main>
  )
}
