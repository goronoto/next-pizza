import { Nunito } from 'next/font/google';
import {Toaster} from 'react-hot-toast'

import './globals.css';
import { Provider } from '@/shared/components/shared/provider';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600','800'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        <main>
            <Provider>
              {children}
            </Provider>
        </main>
      </body>
    </html>
  );
}