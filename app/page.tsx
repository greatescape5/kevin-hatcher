import Link from 'next/link';
import { getProjects, getComparisons } from '@/lib/supabase';
import ServiceIcon from '@/components/ServiceIcon';
import BeforeAfter from '@/components/BeforeAfter';

// Update this to the real business phone number.
const PHONE = '(208) 920-3352';
const PHONE_HREF = 'tel:+12089203352';

// Re-check the database periodically so new highlights appear without a redeploy.
export const revalidate = 60;

export const metadata = {
  alternates: { canonical: '/' },
};

const SERVICES = [
  { title: 'Site Preparation', text: 'Clearing, grading, and prepping residential and commercial building sites and foundations of any size.' },
  { title: 'Grading & Excavation', text: 'Site grading, leveling, driveways, access roads, and foundation excavation done right.' },
  { title: 'Septic Systems', text: 'Licensed installation and replacement of septic systems that meet Bonner County requirements.' },
  { title: 'Land Clearing', text: 'Tree removal, logging, and mulching to open up and prepare your property.' },
  { title: 'Utilities & Drainage', text: 'Utility installation, drainage systems, and erosion control.' },
  { title: 'Retaining Walls & Hardscaping', text: 'Retaining and decorative walls, hardscaping, and landscaping.' },
];

const WHY = [
  { title: 'Local Expertise', text: 'Serving Sandpoint, Ponderay, Sagle, Bonners Ferry, and communities across North Idaho.' },
  { title: 'Quality Results', text: 'Professional equipment, experienced crew, and proven results.' },
  { title: 'Reliable & Transparent', text: 'Licensed, insured, and upfront with every project.' },
  { title: '40+ Years Experience', text: 'A proven track record working in the community for over four decades.' },
];

const REVIEWS = [
  { text: "Kevin is smart, experienced, hard working, helpful, reliable, on time and reasonably priced. You really couldn't find a better guy. He helped me solve a lot of difficult problems and saved me a bunch of money. I won't use anyone else.", who: 'William Hanvey' },
  { text: "I can tell you personally Kevin is a very honest person. I've never seen somebody work harder on another person's property than Kevin. Al and I were extremely pleased with what he did at our place.", who: 'Dorothy Bly Blevens, Talache Road' },
  { text: 'I have been beyond blessed and grateful to have Kevin and his son, Ben do work for my home! Very efficient, professional, honest and affordable! You will never have to wait very long to get any response from Kevin!', who: 'Kelly Karr, Sandpoint' },
  { text: 'Very quick and deliberate operating his equipment which results in getting the job done accurately, efficiently, and on time. I have been using them since 1974 for septic, excavation, foundation, and delivering gravel, sand and landscaping projects.', who: 'Larry Meriam, Sandpoint' },
];

const AREAS = ['Sandpoint', 'Ponderay', 'Sagle', 'Cocolalla', 'Kootenai', 'Athol', 'Bonners Ferry', 'Priest River', "Coeur d'Alene", 'Bonner County'];

export default async function HomePage() {
  const [projects, comparisons] = await Promise.all([getProjects(), getComparisons()]);
  const highlights = projects.slice(0, 3);
  const sliders = comparisons.filter((c) => c.before_image_url && c.after_image_url);

  return (
    <>
      {/* HERO */}
      <section className="hero home-hero">
        <div className="container center">
          <span className="tag">North Idaho</span>
          <h1>Site Prep, Specialty Projects, and Excavation Services for Residential and Commercial Clients</h1>
          <p className="lead">
            From site preparation and grading to septic systems, utilities, and land clearing,
            we get residential and commercial building sites ready across Sandpoint and North Idaho —
            with over 40 years of experience.
          </p>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
            <a href={PHONE_HREF} className="btn btn-outline">Call Now</a>
          </div>
        </div>
      </section>

      {/* INTRO — site-preparation keyword copy */}
      <section className="section">
        <div className="container center">
          <span className="eyebrow">Sandpoint &amp; North Idaho</span>
          <h2>Site Preparation &amp; Excavation, Done Right</h2>
          <p className="lead" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Kevin Hatcher Excavation has spent 40+ years preparing building sites across Bonner
            County — from construction site prep, grading, and leveling to foundation excavation,
            septic systems, and land clearing. Whether it&rsquo;s a residential lot in Sandpoint or a
            commercial site in Ponderay, Sagle, or Bonners Ferry, we get your ground ready to build.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section tint-blue">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow">What We Do</span>
            <h2>Our Services</h2>
          </div>
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="card">
                <div className="icon"><ServiceIcon name={s.title} size={26} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER SHOWCASE */}
      {sliders.length > 0 && (
        <section className="section tint-cream">
          <div className="container">
            <div className="center" style={{ marginBottom: 40 }}>
              <span className="eyebrow">Our Featured Projects</span>
              <h2>Let Us Create Your Favorite Space</h2>
              <p className="lead">Drag the slider to see the transformation for yourself.</p>
            </div>
            <div style={{ display: 'grid', gap: 40 }}>
              {sliders.map((c) => (
                <div key={c.id}>
                  <BeforeAfter before={c.before_image_url!} after={c.after_image_url!} />
                  {c.title && (
                    <p className="ba-hint"><strong>{c.title}</strong> — drag to compare</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PORTFOLIO HIGHLIGHTS */}
      <section className="section tint-teal">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow">See the Difference</span>
            <h2>Our Recent Projects</h2>
          </div>

          {highlights.length > 0 ? (
            <div className="gallery-grid">
              {highlights.map((p) => (
                <div key={p.id} className="gallery-item">
                  {p.after_image_url && (
                    <img src={p.after_image_url} alt={p.name} />
                  )}
                  <div className="meta">
                    {p.category && <span className="badge">{p.category}</span>}
                    <h3>{p.name}</h3>
                    {p.description && <p>{p.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-note">
              Project photos will appear here once the gallery is loaded.
            </div>
          )}

          <div className="center" style={{ marginTop: 34 }}>
            <Link href="/services" className="btn btn-ghost">View All Services</Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section grad">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow">Why Us</span>
            <h2>Why Choose Us?</h2>
            <p className="lead">
              A local company with a proven track record working in the community
              over the last 40+ years.
            </p>
          </div>
          <div className="grid grid-4">
            {WHY.map((w) => (
              <div key={w.title} className="card">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section tint-blue">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow">Satisfied Customers</span>
            <h2>Reviews</h2>
          </div>
          <div className="grid grid-2">
            {REVIEWS.map((r) => (
              <div key={r.who} className="review">
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="who">{r.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="section tint-teal">
        <div className="container center">
          <span className="eyebrow">We Come To You</span>
          <h2 style={{ marginBottom: 26 }}>Areas We Service</h2>
          <div className="areas">
            {AREAS.map((a) => <span key={a}>{a}</span>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section grad">
        <div className="container">
          <div className="cta-band">
            <h2>Ready to Start Your Project?</h2>
            <p>Get your free excavation quote today. Serving Sandpoint and communities across North Idaho.</p>
            <div className="btn-row center">
              <Link href="/contact#get-in-touch" className="btn btn-primary">Get a Quote</Link>
              <a href={PHONE_HREF} className="btn btn-ghost">Call {PHONE}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
