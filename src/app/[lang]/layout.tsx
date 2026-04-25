import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WipeUp | A New Hygiene Experience',
  description: 'WipeUp - Smart hygiene, toilet innovation, and investment opportunity.',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dir = lang === 'he' ? 'rtl' : 'ltr'
  return (
    <html lang={lang} dir={dir}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
