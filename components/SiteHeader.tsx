import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/lib/areas';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="stripe" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="container nav">
        <Link href="/" className="brand">
          <Image
            src="/logo.png"
            alt="Kevin Hatcher Excavation"
            width={110}
            height={110}
            priority
          />
        </Link>
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
              {AREAS.map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`}>{a.name}</Link>
              ))}
            </div>
          </div>
          <Link href="/contact">Contact</Link>
          <Link href="/contact#get-in-touch" className="btn btn-primary nav-cta">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
