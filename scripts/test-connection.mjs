// Quick check: does the anon key connect and can we read the exc_projects table?
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// Load .env.local manually (no dotenv dependency needed).
const env = {};
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// 1. READ exc_projects (public read should work)
const { data: projects, error: readErr } = await supabase
  .from('exc_projects').select('*').order('sort_order');

if (readErr) {
  console.log('READ exc_projects: FAILED â€”', readErr.message);
} else {
  console.log(`READ exc_projects: OK â€” ${projects.length} rows`);
  projects.forEach((p) => console.log(`   â€¢ ${p.name} [${p.category}]`));
}

// 2. Insert a test lead (anon insert should work)
const { error: insErr } = await supabase.from('exc_leads').insert([{
  name: 'Connection Test', email: 'test@example.com',
  phone: '', service: 'Other', message: 'Automated connection test â€” safe to delete.',
}]);
console.log(insErr ? `INSERT lead: FAILED â€” ${insErr.message}` : 'INSERT lead: OK (test row added to leads)');

// 3. Confirm anon CANNOT read leads (RLS should block this)
const { data: leaks, error: leakErr } = await supabase.from('exc_leads').select('*');
if (leakErr) {
  console.log('READ leads as anon: blocked (good) â€”', leakErr.message);
} else {
  console.log(`READ leads as anon: returned ${leaks.length} rows (expected 0 â€” RLS hides them)`);
}

