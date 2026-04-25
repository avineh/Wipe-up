'use client'

import React, { useState, useEffect } from 'react'
import { Dictionary } from '../i18n/dictionaries'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import Image from 'next/image'

export default function Navigation({ dict, lang }: { dict: Dictionary, lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = lang === 'en' ? 'he' : 'en'

  const navLinks = [
    { href: '#roadmap', label: dict.nav.roadmap },
    { href: '#team', label: dict.nav.team },
    { href: '#plan', label: dict.nav.plan },
    { href: '#experience', label: dict.nav.experience },
    { href: '#technology', label: dict.nav.technology },
    { href: '#investors', label: dict.nav.investors },
    { href: '#faq', label: dict.nav.faq },
    { href: '#contact', label: dict.nav.contact },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'bg-transparent py-4'}`} style={{ height: 'var(--nav-height)' }}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href={`/${lang}`} className="flex items-center">
            <Image src="/logo.png" alt="WipeUp Logo" width={160} height={48} className="object-contain h-10 w-auto md:h-12" priority />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6 m-0 p-0 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-accent pl-4 ml-2 rtl:border-r rtl:border-l-0 rtl:pr-4 rtl:pl-0 rtl:mr-2 rtl:ml-0">
            <Link href={`/${toggleLang}`} className="font-semibold text-gray-500 hover:text-primary">
              {dict.nav.switchLang}
            </Link>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              {dict.nav.investNow}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <Link href={`/${toggleLang}`} className="font-semibold text-gray-500">
            {dict.nav.switchLang}
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[var(--nav-height)] left-0 right-0 bg-white shadow-lg border-t border-accent p-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="block w-full py-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 border-t border-accent mt-2">
              <a href="#contact" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                {dict.nav.investNow}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
