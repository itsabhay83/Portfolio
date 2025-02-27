import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/toaster'
const ToggleTheme = dynamic(() => import('@/components/ToggleTheme'), {
  ssr: false
})
const Logo = dynamic(() => import('@/components/navbarSection/Logo'), {
  ssr: false
})
const Navbar = dynamic(() => import('@/components/navbarSection/Navbar'), {
  ssr: false
})
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroller'
import type { Viewport } from 'next'
import { Roboto_Slab as Inter } from 'next/font/google'
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    default: 'Abhay porwal | Full Stack Developer',
    template: '%s | Abhay Porwal | Full Stack Developer'
  },
  icons: {
    icon: '/images/logo_dark.png'
  },
  authors: [{ name: 'Abhay Porwal', url: 'https://github.com/itsabhay83' }],
  description:
    'Portfolio website of Abhay Porwal made with Next.js, Tailwind CSS, Three.js and Framer Motion.',
  keywords:
    'Abhay Porwal, Nextjs, Developer Portfolio, Portfolio, Nextjs, Framer motion, Aceternity UI, Tailwind CSS',
  openGraph: {
    title: 'Abhay Porwal | Full Stack Developer',
    description:
      'Portfolio website of Abhay Porwal made with Next.js, Tailwind CSS, Three.js and Framer Motion.',
    type: 'website',
    url: 'https://prajyot-khadse.vercel.app/',
    siteName: 'Shutter Stories',
    images: [
      'https://res.cloudinary.com/djghl1dtn/image/upload/v1737475775/rqbkfku0es33piqcrktb.png'
    ]
  },
  twitter: {
    title: 'Abhay Porwal | Full Stack Developer',
    site: 'https://prajyot-khadse.vercel.app/',
    description:
      'Portfolio website of Prajyot Khadse made with Next.js, Tailwind CSS, Three.js and Framer Motion.',
    images: [
      'https://res.cloudinary.com/djghl1dtn/image/upload/v1737475775/rqbkfku0es33piqcrktb.png'
    ],
    card: 'summary_large_image'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen w-screen overflow-y-auto overflow-x-hidden font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Logo />
            <Navbar />
            <div className='fixed right-10 top-10 z-50 hidden md:flex'>
              <ToggleTheme />
            </div>
            {children}
            <Footer />
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
