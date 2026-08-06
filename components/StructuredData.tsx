// LocalBusiness (GeneralContractor) JSON-LD — helps Google understand who/where
// Kevin Hatcher Excavation is and what it offers. Rendered site-wide from the layout.
// Keep the NAP (name, address, phone) here IDENTICAL to the Google Business Profile.
const SITE = 'https://kevinhatcherexcavation.com';

const AREAS = [
  'Sandpoint',
  'Ponderay',
  'Sagle',
  'Cocolalla',
  'Kootenai',
  'Athol',
  'Bonners Ferry',
  'Priest River',
  "Coeur d'Alene",
  'Bonner County, Idaho',
  'North Idaho',
];

const SERVICES = [
  'Site Preparation',
  'Construction Site Preparation',
  'Grading & Leveling',
  'Excavation',
  'Foundation Preparation',
  'Land Clearing',
  'Septic System Installation',
  'Road Building & Driveways',
  'Utility Installation',
  'Drainage Systems',
  'Retaining Walls',
];

export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE}/#business`,
    name: 'Kevin Hatcher Excavation',
    image: `${SITE}/logo.png`,
    logo: `${SITE}/logo.png`,
    url: SITE,
    telephone: '+1-208-920-3352',
    email: 'Khatcher40@yahoo.com',
    priceRange: '$$',
    description:
      'Site preparation, grading, excavation, septic systems, and land clearing for residential and commercial clients across Sandpoint and North Idaho. Over 40 years of experience.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cocolalla',
      addressRegion: 'ID',
      postalCode: '83813',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.1561, longitude: -116.6221 },
    areaServed: AREAS.map((name) => ({ '@type': 'Place', name })),
    sameAs: ['https://www.facebook.com/septicsystemssiteprep/'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Excavation & Site Preparation Services',
      itemListElement: SERVICES.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
