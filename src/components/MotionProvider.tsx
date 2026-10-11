import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/** Loads only the small domAnimation feature set. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
