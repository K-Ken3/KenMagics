/**
 * Extracts every hard-coded content array from the deployed legacy bundle.
 * Run with: node scripts/extract-legacy.mjs
 * Output: lib/data/legacy-live.generated.json
 */
import { mkdir, writeFile } from 'node:fs/promises';

const SITE = 'https://ken-portfolio-sable.vercel.app/';

function balancedFrom(source, start) {
  const open = source[start];
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  let quote = null;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (char === '\\') i += 1;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`Unbalanced expression at ${start}`);
}

function evaluateAt(source, at) {
  let cursor = at;
  while (source[cursor] !== '{' && source[cursor] !== '[') cursor += 1;
  return Function(`"use strict";return (${balancedFrom(source, cursor)})`)();
}

function readAssignment(source, name) {
  const marker = `${name}=`;
  const at = source.indexOf(marker);
  if (at < 0) throw new Error(`Could not find assignment ${name}`);
  return evaluateAt(source, at + marker.length);
}

function readFrenchServices(source) {
  const marker = 'function FM(t){return t==="en"?BM:';
  const at = source.indexOf(marker);
  if (at < 0) throw new Error('Could not find French services function');
  return evaluateAt(source, at + marker.length);
}

const html = await (await fetch(SITE)).text();
const bundlePath = html.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/)?.[0];
if (!bundlePath) throw new Error('Could not locate legacy JS bundle');
const bundle = await (await fetch(new URL(bundlePath, SITE))).text();

const data = {
  source: new URL(bundlePath, SITE).toString(),
  translations: readAssignment(bundle, 'qA'),
  servicesEn: readAssignment(bundle, 'BM'),
  servicesFr: readFrenchServices(bundle),
  softwareProjects: readAssignment(bundle, 'HM'),
  designProjects: readAssignment(bundle, 'qM'),
  process: readAssignment(bundle, 'OM'),
  testimonials: readAssignment(bundle, 'zM'),
  disciplines: readAssignment(bundle, 'GM'),
};

const json = JSON.stringify(data, (_key, value) =>
  typeof value === 'function' ? '[legacy localisation function]' : value, null, 2);
await mkdir('lib/data', { recursive: true });
await writeFile('lib/data/legacy-live.generated.json', `${json}\n`);
console.log(`Wrote lib/data/legacy-live.generated.json (${json.length} bytes) from ${data.source}`);
