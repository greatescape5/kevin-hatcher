// Service-area landing pages. Each is a local-SEO page targeting
// "excavation / site preparation in <town>, Idaho". Keep the copy unique per
// area (Google penalizes near-duplicate location pages).

export type Area = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  detail: string;
};

export const AREAS: Area[] = [
  {
    slug: 'sandpoint',
    name: 'Sandpoint',
    tagline: "Bonner County's hub on Lake Pend Oreille",
    intro:
      'Kevin Hatcher Excavation has prepared building sites across Sandpoint for over 40 years — from residential lots to commercial projects. As Bonner County’s largest town and our own backyard, Sandpoint is where much of our site preparation, grading, and septic work happens.',
    detail:
      'Sandpoint’s mix of lakefront parcels, hillside lots, and in-town infill each come with their own challenges — rock, slope, drainage, and access. We handle the full scope: land clearing, excavation, grading, foundation prep, driveways, and septic systems that meet Bonner County requirements.',
  },
  {
    slug: 'ponderay',
    name: 'Ponderay',
    tagline: "Sandpoint's fast-growing commercial neighbor",
    intro:
      'Just northeast of Sandpoint, Ponderay is one of the fastest-growing spots in the county. We provide site preparation, grading, and excavation for both the commercial development along the Highway 95 corridor and the new residential builds filling in around it.',
    detail:
      'Whether it’s prepping a pad for a new building, running utilities, grading a parking area, or installing drainage, our crew and equipment are only minutes away in Ponderay.',
  },
  {
    slug: 'sagle',
    name: 'Sagle',
    tagline: 'Rural acreage just south of Sandpoint',
    intro:
      'Sagle’s larger rural lots and lakefront properties are a big part of what we do. From clearing raw land to installing septic systems and building driveways, we prepare Sagle sites for new homes and shops.',
    detail:
      'Acreage builds often need more than a foundation dig — road and driveway building, drainage, land clearing, and rock work. We bring the trucks and machines to handle all of it in one place.',
  },
  {
    slug: 'kootenai',
    name: 'Kootenai',
    tagline: 'Lakeside living east of Sandpoint',
    intro:
      'The small city of Kootenai sits right between Ponderay and the lake. We handle site preparation, grading, septic, and excavation for its residential lots and waterfront-adjacent properties.',
    detail:
      'Tight lots and high water tables near the lake call for careful grading and drainage — we’ve been solving those problems in Kootenai for decades.',
  },
  {
    slug: 'cocolalla',
    name: 'Cocolalla',
    tagline: 'Our home base',
    intro:
      'Cocolalla is home for us. Based right here, we know the rural terrain south of Sagle — the acreage, the timber, and the ground — better than anyone. Site prep, land clearing, septic, and excavation are our daily work in Cocolalla.',
    detail:
      'Being local means fast response and no long haul for equipment. If you’re building or clearing land around Cocolalla Lake or the surrounding hills, we’re right down the road.',
  },
  {
    slug: 'dover',
    name: 'Dover',
    tagline: 'Riverside city west of Sandpoint',
    intro:
      'Just west of Sandpoint on the Pend Oreille River, Dover has grown quickly with new residential development. We provide site preparation, grading, foundation excavation, and septic for its lots and custom homes.',
    detail:
      'From riverfront parcels to the neighborhoods above town, we handle clearing, grading, drainage, and driveway work to get Dover sites build-ready.',
  },
  {
    slug: 'dover-bay',
    name: 'Dover Bay',
    tagline: 'Master-planned waterfront community',
    intro:
      'Dover Bay is one of the area’s premier planned communities on the Pend Oreille River. We prepare custom-home sites there with the precision these lots demand — clean grading, solid foundation prep, proper drainage, and tidy finish work.',
    detail:
      'Building in a planned community means meeting standards and keeping a clean site. Our 40+ years of experience keep Dover Bay projects on schedule and up to spec.',
  },
  {
    slug: 'schweitzer',
    name: 'Schweitzer',
    tagline: 'Mountain properties above Sandpoint',
    intro:
      'Up at Schweitzer, building conditions are steeper and more demanding. We handle mountain site preparation, excavation, and grading on the slopes above Sandpoint — where access, rock, and grade all matter.',
    detail:
      'Steep-lot excavation, retaining walls, drainage, and access roads are where our heavy equipment and experience really pay off. If you’re building near Schweitzer Mountain Resort, we can prep the site.',
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
