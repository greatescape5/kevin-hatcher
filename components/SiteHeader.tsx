'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/lib/areas';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setAreasOpen(false);
  };

  return (
    <header className="site-header">
      <div className="stripe" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="container nav">
        <Link href="/" className="brand" onClick={close}>
          <Image
            src="/logo.png"
            alt="Kevin Hatcher Excavation"
            width={110}
            height={110}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <div className="nav-dropdown">
            <Link href="/areas" className="nav-dropdown-label">
              Areas We Serve
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" aria-hidden="true" style={{ marginLeft: 4 }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
            <div className="nav-dropdown-menu">
              <span className="nav-dropdown-eyebrow">Towns We Serve</span>
              <div className="nav-dropdown-grid">
                {AREAS.map((a) => (
                  <Link key={a.slug} href={`/areas/${a.slug}`}>{a.name}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/contact">Contact</Link>
          <Link href="/contact#get-in-touch" className="btn btn-primary nav-cta">Get a Quote</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="mobile-menu">
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/services" onClick={close}>Services</Link>

          {/* Areas We Serve — collapsible on mobile */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={areasOpen}
            onClick={() => setAreasOpen((o) => !o)}
          >
            Areas We Serve
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" aria-hidden="true" className={areasOpen ? 'rot' : ''}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {areasOpen && (
            <div className="mobile-menu-areas">
              {AREAS.map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`} onClick={close}>{a.name}</Link>
              ))}
            </div>
          )}

          <Link href="/contact" onClick={close}>Contact</Link>
          <Link href="/contact#get-in-touch" className="btn btn-primary mobile-menu-cta" onClick={close}>
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
