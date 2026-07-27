import Link from 'next/link';
import Image from 'next/image';

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
            width={55}
            height={55}
            priority
          />
          <span>Kevin Hatcher Excavation</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact#get-in-touch" className="btn btn-primary nav-cta">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
