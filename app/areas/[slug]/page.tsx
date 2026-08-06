import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AREAS, getArea } from '@/lib/areas';
import ServiceIcon from '@/components/ServiceIcon';

const PHONE = '(208) 920-3352';
const PHONE_HREF = 'tel:+12089203352';

// Services highlighted on each area page.
const SERVICES = [
  'Site Preparation',
  'Grading & Leveling',
  'Excavation',
  'Foundation Preparation',
  'Land Clearing',
  'Septic Systems',
  'Driveways & Road Building',
  'Drainage & Utilities',
];

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) return { title: 'Areas We Serve' };
  return {
    title: `Excavation & Site Preparation in ${area.name}, ID`,
    description: `${area.intro.slice(0, 155)}`,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  return (
    <>
      <section className="hero" style={{ padding: '60px 0' }}>
        <div className="container center">
          <Link href="/areas" style={{ fontWeight: 600 }}>← All Areas</Link>
          <h1 style={{ marginTop: 10 }}>Excavation &amp; Site Preparation in {area.name}, Idaho</h1>
          <p className="lead">{area.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2 services-split">
            <div>
              <span className="eyebrow">Serving {area.name}</span>
              <h2>{area.tagline}</h2>
              <p>{area.detail}</p>
              <div className="btn-row" style={{ marginTop: 8 }}>
                <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
                <a href={PHONE_HREF} className="btn btn-outline">Call {PHONE}</a>
              </div>
            </div>
            <div>
              <div className="card list-card">
                <h3 style={{ padding: '18px 0 6px' }}>What We Do in {area.name}</h3>
                {SERVICES.map((s) => (
                  <div key={s} className="service-row">
                    <span className="service-row-ic"><ServiceIcon name={s} size={22} /></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-final">
        <div className="container center">
          <span className="eyebrow">{area.name}, Idaho</span>
          <h2>Ready to Prep Your {area.name} Site?</h2>
          <p>Contact Kevin Hatcher Excavation for a free quote — 40+ years serving North Idaho.</p>
          <div className="btn-row center">
            <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
            <a href={PHONE_HREF} className="btn btn-ghost">Call {PHONE}</a>
          </div>
        </div>
      </section>
    </>
  );
}
