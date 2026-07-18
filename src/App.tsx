import { I18nProvider } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Positioning } from './sections/Positioning'
import { Capabilities } from './sections/Capabilities'
import { HowItWorks } from './sections/HowItWorks'
import { Ecosystem } from './sections/Ecosystem'
import { Audiences } from './sections/Audiences'
import { Devices } from './sections/Devices'
import { CTA } from './sections/CTA'

export default function App() {
  return (
    <I18nProvider>
      <Header />
      <main id="top">
        <Hero />
        <Positioning />
        <Capabilities />
        <HowItWorks />
        <Ecosystem />
        <Audiences />
        <Devices />
        <CTA />
      </main>
      <Footer />
    </I18nProvider>
  )
}
