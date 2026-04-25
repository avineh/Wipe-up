import Navigation from '../../components/Navigation'
import { Hero, Roadmap, Team, Financials, Experience, Technology, Investors, FAQ, Contact, Footer } from '../../components/Sections'
import { dictionaries } from '../../i18n/dictionaries'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'en' && lang !== 'he') {
    notFound()
  }

  const dict = dictionaries[lang as 'en' | 'he']

  return (
    <main>
      <Navigation dict={dict} lang={lang} />
      <Hero dict={dict} lang={lang} />
      <Roadmap dict={dict} />
      <Team dict={dict} />
      <Financials dict={dict} />
      <Experience dict={dict} />
      <Technology dict={dict} />
      <Investors dict={dict} />
      <FAQ dict={dict} />
      <Contact dict={dict} />
      
      <Footer dict={dict} />
    </main>
  )
}
