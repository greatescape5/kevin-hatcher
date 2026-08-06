import Link from 'next/link';
import { getFolders, getProjects } from '@/lib/supabase';
import ServiceIcon from '@/components/ServiceIcon';

export const metadata = {
  title: 'Excavation & Site Preparation Services in North Idaho',
  description:
    'Site preparation, construction site prep, grading, excavation, foundation prep, land clearing, and septic systems in Sandpoint, Bonners Ferry, and across North Idaho.',
  alternates: { canonical: '/services' },
};

// Re-check the database periodically so new folders/photos appear without a redeploy.
export const revalidate = 60;

const PHONE = '(208) 920-3352';
const PHONE_HREF = 'tel:+12089203352';
const SERVICE_NAMES = [
  'Site Preparation',
  'Construction Site Prep',
  'Residential & Commercial Grading',
  'Excavation',
  'Foundation Preparation',
  'Land Clearing',
  'Tree Removal / Logging',
  'Mulching',
  'Road Building & Driveways',
  'Rock Hauling',
  'Trucking / Material Delivery',
  'Utility Installation',
  'Drainage Systems',
  'Septic Systems',
  'Erosion Control',
  'Retaining & Decorative Walls',
  'Hardscaping',
  'Landscaping',
  'Property & Land Development',
  'Trail Building',
];

export default async function ServicesPage() {
  const [folders, projects] = await Promise.all([getFolders(), getProjects()]);

  // Group projects by folder so each card can show a cover photo + count.
  const byFolder = new Map<string, typeof projects>();
  for (const p of projects) {
    if (!p.folder_id) continue;
    const list = byFolder.get(p.folder_id) ?? [];
    list.push(p);
    byFolder.set(p.folder_id, list);
  }

  return (
    <>
      <section className="hero" style={{ padding: '64px 0' }}>
        <div className="container center">
          <span className="tag">What We Offer</span>
          <h1>Excavation &amp; Site Preparation Services</h1>
          <p className="lead">
            A full range of site preparation, grading, and excavation services for homeowners,
            contractors, and businesses throughout Sandpoint and North Idaho. Tap a service to see
            recent work.
          </p>
        </div>
      </section>

      {/* PROJECT TILES (folder galleries) */}
      <section className="section tint-teal">
        <div className="container">
          {folders.length > 0 ? (
            <div className="gallery-grid">
              {folders.map((f) => {
                const items = byFolder.get(f.id) ?? [];
                const cover = items.find((p) => p.after_image_url)?.after_image_url || null;
                return (
                  <Link key={f.id} href={`/services/${f.slug}`} className="gallery-item folder-card">
                    {cover ? (
                      <img src={cover} alt={f.name} />
                    ) : (
                      <div className="folder-cover-empty" aria-hidden="true">
                        <ServiceIcon slug={f.slug} name={f.name} size={56} />
                      </div>
                    )}
                    <div className="meta">
                      <h3 className="folder-title">
                        <span className="folder-ic"><ServiceIcon slug={f.slug} name={f.name} size={22} /></span>
                        {f.name}
                      </h3>
                      {f.description && <p>{f.description}</p>}
                      <span className="folder-count">
                        {items.length} {items.length === 1 ? 'photo' : 'photos'} · View →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="empty-note">
              <p style={{ margin: 0 }}>Services will appear here once they&rsquo;re added in the admin.</p>
            </div>
          )}

        </div>
      </section>

      {/* EVERYTHING WE DO */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <span className="eyebrow">Full List</span>
            <h2>Everything We Do</h2>
          </div>
          <div className="card list-card service-cols">
            {SERVICE_NAMES.map((name) => (
              <div key={name} className="service-row">
                <span className="service-row-ic"><ServiceIcon name={name} size={24} /></span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — Don't see what you need */}
      <section className="section cta-final">
        <div className="container center">
          <span className="eyebrow">Let&rsquo;s Get Started</span>
          <h2>Don&rsquo;t See What You Need?</h2>
          <p>
            Just ask! Whether you need a new driveway, a cleared building site, or a complete
            septic system installation, our experienced team delivers reliable results with
            professional equipment and local expertise.
          </p>
          <div className="btn-row center">
            <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
            <a href={PHONE_HREF} className="btn btn-ghost">Call {PHONE}</a>
          </div>
        </div>
      </section>
    </>
  );
}
