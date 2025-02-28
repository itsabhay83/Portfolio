'use client'

import { TypeAnimation } from 'react-type-animation'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
const Light3DCanvas = dynamic(() => import('../canvas/Light3DCanvas'), {
  ssr: false
})
const Dark3DCanvas = dynamic(() => import('../canvas/Dark3DCanvas'), {
  ssr: false
})
const MobileLandingPage = dynamic(() => import('./MobileLandingPage'), {
  ssr: false
})
const StaticMobileNavbar = dynamic(
  () => import('../navbarSection/StaticMobileNavbar'),
  {
    ssr: false
  }
)
import Sparkles from './Sparkles'
import { useRef } from 'react'
import { useInView, motion, useScroll, useTransform } from 'framer-motion'
import { smallslideup } from '@/lib/framer'
import Link from 'next/link'

export default function LandingPage() {
  const { theme } = useTheme()

  const container = useRef(null)
  const inView = useInView(container, {
    margin: '0px 100px -50px 0px'
  })

  const title = `a b h a y    p o r w a l`
  const mobileTitle = `Abhay Porwal`

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const sectionY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <section
      id='home'
      className='relative w-full overflow-hidden bg-[#f0f3ec] dark:bg-[#161616] md:overflow-visible'
    >
      <StaticMobileNavbar />

      <div className='inset-0 top-0 h-screen w-full'>
        <div
          ref={ref}
          className='absolute mx-auto flex h-screen w-full max-w-[100%] md:max-w-[86%]'
        >
          <motion.div
            style={{ y: sectionY }}
            className={`z-40 m-auto flex h-[35%] w-[90%] flex-col items-center max-[400px]:w-[95%] sm:h-[45%] sm:w-[75%] md:w-[69%] md:items-start xl:h-[40%]`}
          >
            <h1
              ref={container}
              className='flex flex-wrap gap-2 py-2 pl-[6px] text-2xl font-semibold uppercase tracking-tight text-gray-800 dark:text-gray-400 max-[400px]:text-xl md:text-gray-600'
            >
              {title.split(' ').map((x, index) => {
                return (
                  <span
                    key={index}
                    className='hide relative hidden justify-start min-[400px]:flex'
                  >
                    <motion.span
                      variants={smallslideup}
                      custom={index}
                      initial='initial'
                      animate={inView ? 'animate' : 'exit'}
                    >
                      {x}
                    </motion.span>
                  </span>
                )
              })}
              {mobileTitle.split(' ').map((x, index) => {
                return (
                  <span
                    key={index}
                    className='hide relative flex justify-start min-[400px]:hidden'
                  >
                    <motion.span
                      variants={smallslideup}
                      custom={index}
                      initial='initial'
                      animate={inView ? 'animate' : 'exit'}
                    >
                      {x}
                    </motion.span>
                  </span>
                )
              })}
            </h1>

            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'Web3 Developer',
                1000,
              ]}
              wrapper='span'
              speed={50}
              className='z-30 inline-block h-full w-full py-2 text-center text-[3em] font-bold sm:text-[4em] md:text-start lg:text-[5em] 2xl:text-[6em]'
              repeat={Infinity}
            />

            <Link
              href='/#contact'
              className='z-50 h-16 w-36 self-center font-bold md:self-auto md:pl-1 hover:cursor-pointer'
            >
              <button
                className='inline-flex h-full w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
              >
                Hire me
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className='absolute z-20 h-screen w-screen md:hidden'>
          <MobileLandingPage />
        </div>

        <Sparkles />

        {/* Web */}
        <div className='absolute right-0 top-0 z-30 hidden h-[100vh] w-[100vw] md:flex lg:-right-[25vw]'>
          {theme === 'light' ? <Light3DCanvas /> : <Dark3DCanvas />}
        </div>
      </div>
    </section>
  )
}
