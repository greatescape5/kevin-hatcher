import Link from 'next/link';
import { Cinzel } from 'next/font/google';

// Design-credit font — self-hosted at build time by next/font (no runtime request).
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600'], display: 'swap' });

export default function SiteFooter() {
  const year = 2026; // update yearly if you like
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div style={{ maxWidth: 320 }}>
            <h4>Kevin Hatcher Excavation</h4>
            <p style={{ margin: 0 }}>
              Site prep, septic systems, and excavation services for residential and
              commercial clients across North Idaho.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <p style={{ margin: '0 0 6px' }}><Link href="/">Home</Link></p>
            <p style={{ margin: '0 0 6px' }}><Link href="/services">Services</Link></p>
            <p style={{ margin: '0 0 6px' }}><Link href="/contact">Contact</Link></p>
            <p style={{ margin: 0 }}>
              <a href="https://www.facebook.com/septicsystemssiteprep/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </p>
          </div>
          <div>
            <h4>Service Areas</h4>
            <p style={{ margin: 0 }}>
              Sandpoint · Sagle · Cocolalla<br />
              Athol · Ponderay · Kootenai<br />
              and surrounding communities
            </p>
          </div>
        </div>
        <div className="fine">
          <span>
            © {year} Kevin Hatcher Excavation{/*
              Hidden admin link: this faint period goes to the admin login. */}
            <Link href="/admin" className="admin-dot" aria-label="Admin">.</Link>
          </span>
          <span>Cocolalla, Idaho — Serving North Idaho</span>
        </div>
        <div className={`site-credit ${cinzel.className}`}>
          Website designed by{' '}
          <a href="https://greatescapewebservices.com" target="_blank" rel="noopener noreferrer">
            Great Escape Web &amp; Business Services, LLC
          </a>
        </div>
      </div>
    </footer>
  );
}
