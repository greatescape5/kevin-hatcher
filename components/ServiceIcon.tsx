// Clean line icons for services/folders — replaces emojis so they render
// identically on every device. Chosen automatically from the folder slug/name.

type Props = { slug?: string | null; name?: string | null; size?: number };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

// Excavator arm + bucket — the "default" excavation icon.
function Excavator(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <rect x="3" y="14" width="8" height="5" rx="1" />
      <circle cx="5.5" cy="20.5" r="1.2" />
      <circle cx="8.5" cy="20.5" r="1.2" />
      <path d="M9 14v-3l5-3 4 4" />
      <path d="M18 12l2 4h-3l-1-2" />
    </svg>
  );
}

// Shovel — site prep / digging.
function Shovel(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M13 3l8 8" />
      <path d="M15 5l-9 9" />
      <path d="M6 14l-3 3c-1 1-1 3 1 4s3 0 4-1l3-3" />
    </svg>
  );
}

// Tree — clearing / logging / mulching.
function Tree(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M12 3l5 7h-3l4 6H6l4-6H7z" />
      <path d="M12 16v5" />
    </svg>
  );
}

// Road with dashed centerline — grading / road building.
function Road(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M8 4L4 20" />
      <path d="M16 4l4 16" />
      <path d="M12 5v3M12 11v3M12 17v3" />
    </svg>
  );
}

// Dump truck — hauling / trucking / material delivery.
function Truck(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M2 8h11l2 4v4H2z" />
      <path d="M15 12h4l3 3v1h-7" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </svg>
  );
}

// Stacked blocks — retaining walls / hardscaping.
function Wall(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 10h18M3 14.5h18" />
      <path d="M9 5v5M15 10v4.5M9 14.5V19" />
    </svg>
  );
}

// Droplet over a pipe — septic / drainage / utilities.
function Pipe(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M12 3s4 4.2 4 6.6a4 4 0 0 1-8 0C8 7.2 12 3 12 3z" />
      <path d="M4 18h16" />
      <path d="M4 21h16" />
    </svg>
  );
}

// Leaf — landscaping / erosion control.
function Leaf(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 4c1 9-3 16-9 16z" />
      <path d="M4 21c2-6 6-9 11-10" />
    </svg>
  );
}

// Winding trail with a marker — trail building.
function Trail(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M4 20c6 0 4-6 10-6 4 0 5-3 5-5" />
      <path d="M19 4v3M17.5 5.5h3" />
    </svg>
  );
}

// House — property / land development.
function House(p: { size: number }) {
  return (
    <svg width={p.size} height={p.size} {...base} aria-hidden="true">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export default function ServiceIcon({ slug, name, size = 24 }: Props) {
  const key = `${slug || ''} ${name || ''}`.toLowerCase();

  if (key.includes('septic') || key.includes('drain') || key.includes('utilit')) return <Pipe size={size} />;
  if (key.includes('tree') || key.includes('logg') || key.includes('mulch') || key.includes('clear')) return <Tree size={size} />;
  if (key.includes('grad') || key.includes('road') || key.includes('driveway')) return <Road size={size} />;
  if (key.includes('truck') || key.includes('haul') || key.includes('material') || key.includes('rock') || key.includes('gravel')) return <Truck size={size} />;
  if (key.includes('wall') || key.includes('hardscap') || key.includes('retain')) return <Wall size={size} />;
  if (key.includes('landscap') || key.includes('erosion')) return <Leaf size={size} />;
  if (key.includes('trail')) return <Trail size={size} />;
  if (key.includes('develop') || key.includes('property')) return <House size={size} />;
  if (key.includes('site') || key.includes('prep') || key.includes('dig') || key.includes('trench') || key.includes('demo')) return <Shovel size={size} />;
  return <Excavator size={size} />;
}
