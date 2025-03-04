'use client'

import {
  AlignJustify,
  Github,
  Linkedin,
  ShieldOff,
  Star,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LinkPreview } from '../ui/link-preview'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
const ToggleTheme = dynamic(() => import('@/components/ToggleTheme'), {
  ssr: false
})
import { FloatingNav } from '../ui/floating-navbar'
import dynamic from 'next/dynamic'
import { mobileNavLinks, navLinks } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import lightLogo from '@/public/images/logo_light.png'
import darkLogo from '@/public/images/logo_dark.png'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

export default function Navbar() {
  const [windowSize, setWindowSize] = useState<number | null>(null)

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerHeight)
  }, [])

  windowSize === null && handleWindowResize()

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize, windowSize])

  return (
    <>
      {/* Web Header View */}
      {windowSize && windowSize > 750 ? (
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className='fixed z-50 mx-10 -mt-[58px] hidden w-[790px] origin-bottom-left rotate-90 justify-between px-10 pt-1 md:flex scale-[1.2]'
        >
          <div className='flex items-center'>
            <p></p>
          </div>

          <nav className='flex items-center gap-x-5'>
            {navLinks.map(item => (
              <Link
                key={item.id}
                className='rotate-180 px-2 font-semibold hover:line-through hover:decoration-[#00eeff] hover:decoration-4'
                href={item.link}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className='flex rotate-180 items-center gap-x-3'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={'/fight-club'}
                    className='z-[100] rotate-90 p-2.5 hover:text-[#00eeff] dark:hover:text-[#00eeff]'
                  >
                    <ShieldOff className='h-[1.5rem] w-[1.5rem]' />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className='absolute top-2 -ml-[86px] h-[74px] w-48 rotate-90 shadow-md shadow-slate-400 dark:shadow-stone-200'>
                  <p>I have some info about FIGHT CLUB</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className='rotate-90 p-2.5'>
              <LinkPreview
                url='https://www.linkedin.com/in/abhayp830/'
                className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
              >
                <Linkedin className='h-[1.5rem] w-[1.5rem]' />
              </LinkPreview>
            </div>
            <div className='rotate-90 p-2.5'>
              <LinkPreview
                url='https://github.com/itsabhay83'
                className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
              >
                <Github className='h-[1.5rem] w-[1.5rem]' />
              </LinkPreview>
            </div>
          </div>
        </motion.header>
      ) : (
        <>
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className='absolute inset-x-0 top-10 z-[40] hidden w-full items-center justify-evenly space-x-4 border-transparent bg-transparent py-2 md:flex scale-[1.2]'
          >
            <WebNavbarContent />
          </motion.header>
          <header className='fixed z-50 mx-10 hidden justify-between px-10 py-2 text-sm md:flex'>
            <FloatingNav>
              <WebNavbarContent />
            </FloatingNav>
          </header>
        </>
      )}

      {/* Mobile Header View */}
      <header className='md:hidden'>
        <FloatingNav>
          <MobileNavbarContent />
        </FloatingNav>
      </header>
    </>
  )
}

const MobileNavbarContent = () => {
  const { theme } = useTheme()
  return (
    <>
      <div>
        <Link
          href={'/'}
          className='rounded-md hover:bg-gray-50 dark:hover:bg-gray-100/10'
        >
          {theme === 'dark' ? (
            <Image
              src={lightLogo}
              alt='logo'
              width={30}
              height={30}
              className='rounded-full'
            />
          ) : (
            <Image
              src={darkLogo}
              alt='logo'
              width={30}
              height={30}
              className='rounded-full'
            />
          )}
        </Link>
      </div>

      <div className='flex items-center gap-x-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={'/fight-club'}
                className='p-3 hover:bg-gray-50 dark:hover:bg-gray-100/10'
              >
                <ShieldOff className='h-[1.5rem] w-[1.5rem]' />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>I have some info about FIGHT CLUB</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost'>
              <AlignJustify className='h-[1.5rem] w-[1.5rem]' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className='mt-10 flex flex-col items-center gap-y-5'>
              {mobileNavLinks.map(item => (
                <SheetClose asChild key={item.id}>
                  <Link
                    className='w-full rounded-md p-2 text-center hover:scale-105 hover:bg-slate-50 hover:font-semibold hover:dark:bg-black/50'
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
              <div className='flex w-full flex-wrap items-center justify-around gap-x-3 pt-10'>
                <div className='p-2.5'>
                  <LinkPreview
                    url='https://in.linkedin.com/in/prajyot-khadse'
                    className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
                  >
                    <Linkedin className='h-[1.5rem] w-[1.5rem]' />
                  </LinkPreview>
                </div>
                <div className='p-2.5'>
                  <LinkPreview
                    url='https://github.com/itsabhay83'
                    className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
                  >
                    <Github className='h-[1.5rem] w-[1.5rem]' />
                  </LinkPreview>
                </div>
              </div>
            </nav>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>

        <ToggleTheme />
      </div>
    </>
  )
}

const WebNavbarContent = () => {
  return (
    <>
      <nav className='flex items-center md:gap-x-3 lg:gap-x-5'>
        {navLinks.map(item => (
          <Link
            key={item.id}
            className='px-2 text-base font-semibold hover:line-through hover:decoration-[#00eeff] hover:decoration-4 lg:text-lg'
            href={item.link}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div className='flex items-center md:gap-x-2 lg:gap-x-3'>
        <div className='p-2.5'>
          <LinkPreview
            url='https://www.linkedin.com/in/abhayp830/'
            className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
          >
            <Linkedin className='md:h-[1.25rem] md:w-[1.25rem] lg:h-[1.5rem] lg:w-[1.5rem]' />
          </LinkPreview>
        </div>
        <div className='p-2.5'>
          <LinkPreview
            url='https://github.com/itsabhay83'
            className='hover:text-[#00eeff] dark:hover:text-[#00eeff]'
          >
            <Github className='md:h-[1.25rem] md:w-[1.25rem] lg:h-[1.5rem] lg:w-[1.5rem]' />
          </LinkPreview>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={'/fight-club'}
                className='p-2.5 hover:text-[#00eeff] dark:hover:text-[#00eeff]'
              >
                <ShieldOff className='md:h-[1.25rem] md:w-[1.25rem] lg:h-[1.5rem] lg:w-[1.5rem]' />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>I have some info about FIGHT CLUB</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}
