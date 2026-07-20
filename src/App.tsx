import { useSyncExternalStore } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { EventMarquee } from '@/components/EventMarquee'
import { AboutExperience } from '@/components/AboutExperience'
import { ExperienceReel } from '@/components/ExperienceReel'
import { Services } from '@/components/Services'
import { WhyBookMe } from '@/components/WhyBookMe'
import { BookingProcess } from '@/components/BookingProcess'
import { TestimonialsPreview } from '@/components/TestimonialsPreview'
import { BookingCTA } from '@/components/BookingCTA'
import { Footer } from '@/components/Footer'
import { MobileBookingBar } from '@/components/MobileBookingBar'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { BackgroundAudioProvider } from '@/context/BackgroundAudioContext'
import { I18nProvider, useI18n } from '@/context/I18nContext'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { BookingPolicyPage } from '@/pages/BookingPolicyPage'

function subscribe(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

function getPathname() {
  return window.location.pathname
}

function HomePage() {
  const { m } = useI18n()

  return (
    <BackgroundAudioProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink"
      >
        {m.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <EventMarquee />
        <AboutExperience />
        <ExperienceReel />
        <Services />
        <WhyBookMe />
        <BookingProcess />
        <TestimonialsPreview />
        <BookingCTA />
      </main>
      <Footer />
      <MobileBookingBar />
      <BackgroundMusic />
    </BackgroundAudioProvider>
  )
}

function Routes() {
  const pathname = useSyncExternalStore(subscribe, getPathname, () => '/')

  if (pathname === '/privacy') {
    return <PrivacyPolicyPage />
  }

  if (pathname === '/booking-policy') {
    return <BookingPolicyPage />
  }

  return <HomePage />
}

export default function App() {
  return (
    <I18nProvider>
      <Routes />
    </I18nProvider>
  )
}
