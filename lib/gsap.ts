'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
export const DESKTOP_MOTION_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
