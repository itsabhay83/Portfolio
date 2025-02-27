'use client'

import { Crown, SendHorizonal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect'
import Link from 'next/link'
import Image from 'next/image'
import img from '@/public/images/Profile.jpg'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards'
import { testimonials } from '@/lib/data'
import { useInView, motion, AnimatePresence } from 'framer-motion'
import {
  imageScale,
  slideLeftSide,
  slideRightSide,
  slideup
} from '@/lib/framer'
import Education from './Education'

export default function About() {
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTimer(true)
    }, 7500)
  }, [timer])

  const container = useRef(null)
  const inView = useInView(container, {
    margin: '250px 100px -50px -50px'
  })
  const aboutContact = `Send me a message`

  const container1 = useRef(null)
  const inView1 = useInView(container1, {
    margin: '50px 50px 50px 50px'
  })

  return (
    <AnimatePresence mode='wait'>
      <section
        id='about'
        className='mx-auto h-auto max-w-[100%] border border-orange-500/0 p-2 md:max-w-[86%] lg:p-10'
      >
        <div className='w-full md:flex md:flex-col lg:flex-row'>
          <div className='border border-red-500/0 lg:basis-1/2'>
            <div className='mx-auto flex h-full w-[95%] flex-col justify-start pt-10 min-[400px]:w-[90%] md:float-end md:p-4 md:pt-20 lg:p-8'>
              <span
                ref={container}
                className='flex flex-wrap gap-2 text-2xl font-semibold text-gray-800 dark:text-gray-50 sm:text-3xl lg:text-4xl 2xl:text-5xl'
              >
                <motion.span
                  variants={slideLeftSide}
                  initial='initial'
                  animate={inView ? 'animate' : 'exit'}
                >
                  Hi there,
                </motion.span>
              </span>
              <br />

              <TextGenerateEffect
                words={`I'm Abhay, a self-taught web developer, tech enthusiast, and product builder passionate about solving complex technical challenges. I adapt quickly to new technologies and take pride in delivering high-quality results with a strong focus on user experience. Striving for excellence, I own my work and ensure every project meets the highest standards.`}
              />

              {timer && (
                <TextGenerateEffect
                  className='pt-4'
                  words={``}
                />
              )}

              <p
                ref={container}
                className='flex items-center gap-2 pt-6 text-lg font-bold text-[#1f8c92] dark:text-[#00eeff] sm:pt-10 sm:text-xl'
              >
                <SendHorizonal />
                <Link href={'#contact'} className='flex flex-wrap gap-2'>
                  {aboutContact.split(' ').map((x, index) => (
                    <span
                      key={index}
                      className='hide relative flex justify-start'
                    >
                      <motion.span
                        variants={slideup}
                        custom={index}
                        initial='initial'
                        animate={inView ? 'animate' : 'exit'}
                      >
                        {x}
                      </motion.span>
                    </span>
                  ))}
                </Link>
              </p>
            </div>
          </div>

          <div
            ref={container}
            className='flex-col gap-y-5 border border-green-500/0 md:flex lg:basis-1/2 lg:self-end'
          >
            <p className='mx-auto hidden w-[90%] gap-x-2 text-xl font-semibold text-[#1f8c92] dark:text-[#00eeff] lg:flex'>
              <Crown />
              <motion.span
                variants={slideRightSide}
                initial='initial'
                animate={inView ? 'animate' : 'exit'}
              >
                About me
              </motion.span>
            </p>
            <motion.div
              ref={container1}
              variants={imageScale}
              initial='initial'
              animate={inView1 ? 'animate' : 'exit'}
            >
              <Image
                src={img}
                alt='skater'
                className='m-auto my-5 h-auto w-[90%] self-center rounded-xl sm:h-[80%] sm:w-[80%] md:h-[90%] md:w-[70%] lg:h-[90%] lg:w-[90%]'
                //className='m-auto my-5 aspect-auto w-[80%] self-center rounded-xl sm:w-[70%] lg:w-[90%]'
              />
            </motion.div>
          </div>
        </div>

        {/* Alternative to Education */}
        <div className='dark:bg-grid-white/[0.05] relative flex h-[25rem] flex-col items-center justify-center overflow-hidden rounded-md antialiased'>
          <InfiniteMovingCards
            items={testimonials}
            direction='right'
            speed='slow'
          />
        </div>

        {/* Alternative to Infinite Moving Cards */}
        {/* <Education /> */}
      </section>
    </AnimatePresence>
  )
}
