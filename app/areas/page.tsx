import Link from 'next/link';
import { AREAS } from '@/lib/areas';
import ServiceIcon from '@/components/ServiceIcon';

const PHONE = '(208) 920-3352';
const PHONE_HREF = 'tel:+12089203352';

export const metadata = {
  title: 'Areas We Serve — Excavation & Site Prep Across North Idaho',
  description:
    'Kevin Hatcher Excavation serves Sandpoint, Ponderay, Sagle, Kootenai, Cocolalla, Dover, Dover Bay, and Schweitzer with site preparation, grading, excavation, and septic.',
  alternates: { canonical: '/areas' },
};

export default function AreasPage() {
  return (
    <>
      <section className="hero" style={{ padding: '64px 0' }}>
        <div className="container center">
          <span className="tag">Where We Work</span>
          <h1>Areas We Serve</h1>
          <p className="lead">
            Based in Cocolalla, we bring our crew and equipment to building sites across Sandpoint
            and the surrounding North Idaho communities. Choose your area to learn more.
          </p>
        </div>
      </section>

      <section className="section tint-teal">
        <div className="container">
          <div className="gallery-grid">
            {AREAS.map((a) => (
              <Link key={a.slug} href={`/areas/${a.slug}`} className="gallery-item folder-card">
                <div className="folder-cover-empty" aria-hidden="true">
                  <ServiceIcon name="site preparation" size={52} />
                </div>
                <div className="meta">
                  <h3 className="folder-title">{a.name}</h3>
                  <p>{a.tagline}</p>
                  <span className="folder-count">View area →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-final">
        <div className="container center">
          <span className="eyebrow">Not Sure If You&rsquo;re In Range?</span>
          <h2>Just Ask — We Cover All of North Idaho</h2>
          <p>Tell us where your project is and we&rsquo;ll let you know. Free quotes, no obligation.</p>
          <div className="btn-row center">
            <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
            <a href={PHONE_HREF} className="btn btn-ghost">Call {PHONE}</a>
          </div>
        </div>
      </section>
    </>
  );
}
