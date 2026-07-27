import ContactForm from './ContactForm';
import HashScroll from '@/components/HashScroll';

export const metadata = {
  title: 'Contact | Kevin Hatcher Excavation',
  description: 'Get a free excavation, site prep, or septic system quote in Sandpoint and North Idaho.',
};

const PHONE = '(208) 920-3352';
const PHONE_HREF = 'tel:+12089203352';
const EMAIL = 'Khatcher40@yahoo.com';

export default function ContactPage() {
  return (
    <>
      <HashScroll />
      <section className="hero" style={{ padding: '64px 0' }}>
        <div className="container center">
          <span className="tag">Get Started</span>
          <h1>Contact Us</h1>
          <p className="lead">
            Tell us what you need and we&rsquo;ll get back to you with a free quote.
            Or call us at <a href={PHONE_HREF}>{PHONE}</a>.
          </p>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 services-split">
            <div>
              <span className="eyebrow">About Us</span>
              <p>
                With years of hands-on experience in excavation, Kevin Hatcher built his company
                on trust, transparency, and quality work. Based in Sandpoint, Kevin takes pride in
                serving North Idaho communities with reliable excavation services — from clearing
                raw land to installing septic systems.
              </p>
              <p>
                Customers know they can count on him for professional results and straightforward
                communication.
              </p>
              <ul className="story-list">
                <li>
                  <strong>Licensed &amp; Insured</strong>
                  <span>You&rsquo;re covered on every job, no exceptions.</span>
                </li>
                <li>
                  <strong>40+ Years of Experience</strong>
                  <span>A proven track record in the community for over four decades.</span>
                </li>
                <li>
                  <strong>Straightforward Communication</strong>
                  <span>Upfront pricing and honest answers on every project.</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                className="story-photo"
                src="/our-story.jpg"
                alt="Tiered rock retaining walls on a hillside property built by Kevin Hatcher Excavation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section id="get-in-touch" className="section tint-cream anchor-offset">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow">Reach Us Easily</span>
            <h2>Get in Touch</h2>
          </div>
          <div className="grid grid-2 services-split">
            {/* Contact info card */}
            <div className="card contact-info">
              <div className="ci-row">
                <span className="ci-ic" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <div>
                  <strong>Call or Text</strong>
                  <a href={PHONE_HREF}>{PHONE}</a>
                </div>
              </div>
              <div className="ci-row">
                <span className="ci-ic" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <strong>Email Us</strong>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
              <div className="ci-row">
                <span className="ci-ic" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <strong>Located In</strong>
                  <span>Cocolalla, Idaho</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
