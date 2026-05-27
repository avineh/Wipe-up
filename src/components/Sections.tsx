'use client'

import React, { useState } from 'react'
import { Dictionary } from '../i18n/dictionaries'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, ChevronDown, Download, FileText, ChevronRight, Settings, Shield, Zap, DollarSign, TrendingUp, Users } from 'lucide-react'

import Image from 'next/image'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Float } from '@react-three/drei'

function WipeUpModel() {
  const { scene } = useGLTF('/wipeupDevice.glb')
  return <primitive object={scene} scale={3.2} position={[0, -0.2, 0]} />
}

// HERO SECTION
export function Hero({ dict, lang }: { dict: Dictionary, lang: string }) {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-color) 100%)' }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container relative z-10 grid-2 items-center gap-12 mt-12 md:mt-20">
        <div className="z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-primary-dark"
          >
            {dict.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-text-secondary mb-12 font-light"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a href="/WIPE_UP_Investor_Deck.pptx" className="btn btn-primary flex items-center gap-2" download>
              <Download size={20} />
              {dict.hero.downloadPptx}
            </a>
            <a href="/WIPE_UP_Investor_Deck.pdf" className="btn btn-outline flex items-center gap-2" download>
              <Download size={20} />
              {dict.hero.downloadPdf}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[400px] md:h-[600px] z-10"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ touchAction: 'none' }} gl={{ toneMappingExposure: 2.5 }}>
            <ambientLight intensity={3} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2.5} />
            <directionalLight position={[-5, 5, 5]} intensity={1.5} />
            <Suspense fallback={null}>
              <PresentationControls
                global
                snap={true}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
              >
                <Float rotationIntensity={0.4} floatIntensity={0.5} speed={1.5}>
                  <WipeUpModel />
                </Float>
              </PresentationControls>
              <Environment preset="city" environmentIntensity={3} />
              <ContactShadows position={[0, 20, 0]} opacity={0.35} scale={35} blur={3} far={10} resolution={512} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  )
}


// FOOTER SECTION
export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="bg-text-primary text-white py-16">
      <div className="container">
        <div className="grid-3 mb-12 border-b border-white/10 pb-12">
          <div>
            <div className="mb-6">
              <Image src="/logo.png" alt="WipeUp Logo" width={180} height={54} className="object-contain h-12 w-auto" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {dict.hero.subtitle}
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:WipeUp2026@gmail.com" className="text-text-secondary hover:text-white transition-colors">WipeUp2026@gmail.com</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#roadmap" className="hover:text-white transition-colors">{dict.nav.roadmap}</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">{dict.nav.team}</a></li>
              <li><a href="#plan" className="hover:text-white transition-colors">{dict.nav.plan}</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">{dict.nav.technology}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Investors</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#investors" className="hover:text-white transition-colors">{dict.nav.investors}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{dict.nav.faq}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors text-primary-light">{dict.nav.investNow}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} WipeUp. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ROADMAP SECTION
export function Roadmap({ dict }: { dict: Dictionary }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="roadmap" className="section bg-bg-color">
      <div className="container">
        <h2 className="section-title">{dict.roadmap.title}</h2>

        <div className="grid-3">
          {/* Completed */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-8 rounded-2xl border-t-4 border-t-green-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-600">
              <CheckCircle2 /> {dict.roadmap.completed.title}
            </h3>
            <div className="space-y-6">
              {dict.roadmap.completed.items.map((item, i) => (
                <div key={i} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                  <div className="absolute left-0 rtl:right-0 rtl:left-auto top-2 w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-text-primary">{item.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-8 rounded-2xl border-t-4 border-t-blue-500 transform md:-translate-y-4">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600">
              <Settings className="animate-spin-slow" /> {dict.roadmap.current.title}
            </h3>
            <div className="space-y-6">
              {dict.roadmap.current.items.map((item, i) => (
                <div key={i} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                  <div className="absolute left-0 rtl:right-0 rtl:left-auto top-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-text-primary">{item.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Future */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-8 rounded-2xl border-t-4 border-t-purple-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-600">
              <TrendingUp /> {dict.roadmap.future.title}
            </h3>
            <div className="space-y-6">
              {dict.roadmap.future.items.map((item, i) => (
                <div key={i} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                  <div className="absolute left-0 rtl:right-0 rtl:left-auto top-2 w-2 h-2 border-2 border-purple-500 rounded-full"></div>
                  <h4 className="font-semibold text-text-primary">{item.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-8 rounded-2xl border-t-4 border-t-yellow-500 mt-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-600">
            <Shield /> {dict.roadmap.registeredDesign.title}
          </h3>
          <div className="space-y-6">
            {dict.roadmap.registeredDesign.items.map((item, i) => (
              <div key={i} className="relative pl-6 rtl:pl-0 rtl:pr-6">
                <div className="absolute left-0 rtl:right-0 rtl:left-auto top-2 w-2 h-2 bg-yellow-500 rounded-full"></div>
                <h4 className="font-semibold text-text-primary">{item.title}</h4>
                <p className="text-sm text-text-secondary mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// TEAM SECTION
export function Team({ dict }: { dict: Dictionary }) {
  return (
    <section id="team" className="section bg-bg-secondary">
      <div className="container">
        <h2 className="section-title">{dict.team.title}</h2>
        <div className="grid-3">
          {dict.team.members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-accent rounded-full mb-6 flex items-center justify-center mx-auto text-primary">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
              <p className="text-primary text-sm font-semibold text-center mb-4">{member.role}</p>
              <p className="text-text-secondary text-center text-sm">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// PLAN & FINANCIALS
export function Financials({ dict }: { dict: Dictionary }) {
  return (
    <section id="plan" className="section bg-bg-color">
      <div className="container">
        <h2 className="section-title">{dict.financials.title}</h2>

        <div className="grid-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-bg-secondary p-8 rounded-3xl">
            <div className="mb-8">
              <h3 className="text-text-secondary text-lg mb-2">Investment to Date</h3>
              <div className="text-4xl font-bold text-primary mb-2">{dict.financials.investmentToDate}</div>
              <div className="text-sm text-text-secondary">{dict.financials.investmentDesc}</div>
            </div>

            <div>
              <h3 className="text-text-secondary text-lg mb-2">Funding Requirement</h3>
              <div className="text-4xl font-bold text-green-600 mb-6">{dict.financials.fundingRequirement}</div>

              <div className="space-y-4">
                {dict.financials.allocation.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-bold text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-bg-secondary p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">CAPEX Breakdown</h3>
              <div className="space-y-4">
                {dict.financials.capexBreakdown.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-accent pb-2 last:border-0">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary text-white p-8 rounded-3xl flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-xl"><TrendingUp size={24} /></div>
              <div>
                <h3 className="font-semibold mb-1">OPEX Forecast</h3>
                <p className="text-lg">{dict.financials.opex}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// QUICK GLANCE
export function QuickGlance({ dict }: { dict: Dictionary }) {
  return (
    <section id="quick-glance" className="section bg-text-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">{dict.quickGlance.title}</h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center w-full"
        >
          <Image
            src="/Evolution.png"
            alt="Personal Hygiene Evolution"
            width="800"
            height="600"
            className="w-full max-w-5xl rounded-3xl shadow-2xl border border-white/20"
          />
        </motion.div>
      </div>
    </section>
  )
}

// TECHNOLOGY & IP
export function Technology({ dict }: { dict: Dictionary }) {
  return (
    <section id="technology" className="section bg-bg-secondary">
      <div className="container">
        <h2 className="section-title">{dict.technology.title}</h2>

        <div className="grid-2">
          {/* Tech Specs */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Zap className="text-primary" /> Technical Specs
            </h3>
            <div className="space-y-6">
              {dict.technology.specs.map((spec, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-semibold text-lg">{spec.title}</span>
                  <span className="text-text-secondary">{spec.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IP Portfolio */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-sm border border-accent">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Shield className="text-purple-600" /> IP Portfolio
            </h3>

            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4">{dict.technology.ip.title}</h4>
              <ul className="space-y-3">
                {dict.technology.ip.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-accent">
              <h4 className="font-bold text-lg mb-4">{dict.technology.ip.extensionsTitle}</h4>
              <ul className="space-y-3 text-text-secondary">
                {dict.technology.ip.extensions.map((ext, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-dark"></div>
                    {ext}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// INVESTORS
export function Investors({ dict }: { dict: Dictionary }) {
  return (
    <section id="investors" className="section bg-primary text-white">
      <div className="container">
        <h2 className="section-title text-white">{dict.investors.title}</h2>

        <div className="grid-2">
          <div>
            <div className="mb-12">
              <p className="text-white/80 text-lg mb-2">{dict.investors.valuationLabel}</p>
              <div className="text-6xl font-bold">{dict.investors.valuation}</div>
            </div>

            <h3 className="text-2xl font-bold mb-6">{dict.investors.termsTitle}</h3>
            <div className="space-y-4">
              {dict.investors.terms.map((term, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-2xl flex justify-between items-center backdrop-blur-sm border border-white/20">
                  <span className="font-medium text-white/90">{term.stage}</span>
                  <span className="font-bold text-xl">{term.terms}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-text-primary p-10 rounded-3xl h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 text-primary">{dict.investors.modelTitle}</h3>
            <div className="space-y-8">
              {dict.investors.modelItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center flex-shrink-0 text-primary">
                    <DollarSign size={24} />
                  </div>
                  <span className="text-xl font-semibold">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href="#contact" className="btn btn-primary w-full text-lg py-4">Become an Investor</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// FAQ
export function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section bg-bg-color">
      <div className="container max-w-3xl">
        <h2 className="section-title">{dict.faq.title}</h2>

        <div className="space-y-4 w-full">
          {dict.faq.questions.map((q, i) => (
            <div key={i} className="border border-accent rounded-2xl bg-white shadow-sm w-full" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
              <button
                className="w-full text-left rtl:text-right px-6 py-5 font-semibold text-lg flex justify-between items-center transition-colors outline-none rounded-2xl"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="pr-4 rtl:pr-0 rtl:pl-4">{q.q}</span>
                <ChevronDown className={`flex-shrink-0 transform transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0 text-text-secondary bg-white">
                  {q.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CONTACT
export function Contact({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      userType: (form.elements.namedItem('userType') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      newsletter: (form.elements.namedItem('newsletter') as HTMLInputElement).checked
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section bg-bg-secondary">
      <div className="container max-w-4xl">
        <h2 className="section-title">{dict.contact.title}</h2>
        <p className="text-center text-text-secondary text-lg mb-12">{dict.contact.cta}</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-accent">
          <div className="grid-2 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">{dict.contact.form.name}</label>
              <input type="text" name="name" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{dict.contact.form.email}</label>
              <input type="email" name="email" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{dict.contact.form.phone}</label>
              <input type="tel" name="phone" required pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{dict.contact.form.company}</label>
              <input type="text" name="company" className="input-field" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{dict.contact.form.userType}</label>
            <select name="userType" className="input-field bg-white">
              <option>{dict.contact.form.types.investor}</option>
              <option>{dict.contact.form.types.partner}</option>
              <option>{dict.contact.form.types.customer}</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{dict.contact.form.message}</label>
            <textarea name="message" rows={4} className="input-field"></textarea>
          </div>

          <div className="mb-8 flex items-center gap-2">
            <input type="checkbox" name="newsletter" id="newsletter" className="w-4 h-4 text-primary rounded focus:ring-primary" />
            <label htmlFor="newsletter" className="text-sm">{dict.contact.form.newsletter}</label>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? "Sending..." : dict.contact.form.submit}
          </button>

          {submitted && (
            <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl text-center border border-green-200">
              {dict.contact.form.success}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
