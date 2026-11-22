// Self-hosted Inter and Oswald, the same TTFs the Nuxt site served. next/font requires literal values here.
import localFont from 'next/font/local'

export const interFont = localFont({
  variable: '--font-inter',
  display: 'swap',
  src: [
    { path: '../assets/fonts/Inter-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../assets/fonts/Inter-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../assets/fonts/Inter-Light.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Inter-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Inter-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Inter-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/Inter-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../assets/fonts/Inter-Black.ttf', weight: '900', style: 'normal' },
  ],
})

export const oswaldFont = localFont({
  variable: '--font-oswald',
  display: 'swap',
  src: [
    { path: '../assets/fonts/Oswald-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../assets/fonts/Oswald-Light.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Oswald-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Oswald-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Oswald-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Oswald-Bold.ttf', weight: '700', style: 'normal' },
  ],
})
