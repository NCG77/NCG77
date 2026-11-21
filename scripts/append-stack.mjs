import fs from 'node:fs';
import path from 'node:path';

const genDir = path.join('profile', 'generated');
if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });

const groups = [
  {
    title: 'AI &amp; AGENTS',
    items: ['Gemini API', 'LLaMA 3', 'MCP', 'RAG', 'LangChain', 'Ragas', 'Pinecone', 'pgvector']
  },
  {
    title: 'FULL-STACK &amp; SYSTEMS',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'FastAPI', 'Express', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'CLOUD, DEVOPS &amp; LANGUAGES',
    items: ['AWS (SAA-C03)', 'Docker', 'GitHub Actions', 'Linux', 'Python', 'TypeScript', 'C++', 'SQL']
  }
];

function renderStackSvg(mode) {
  const isDark = mode === 'dark';
  const c = isDark
    ? { panel: '#181818', well: '#202020', line: '#343434', text1: '#f2f2f2', text3: '#999999', accent: '#f0b286' }
    : { panel: '#ffffff', well: '#f8f7f5', line: '#e5e0db', text1: '#111827', text3: '#6b7280', accent: '#b85d2d' };

  const width = 880;
  const height = 286;
  let y = 78;
  let rowsSvg = '';

  for (const group of groups) {
    rowsSvg += `<text x="28" y="${y}" fill="${c.accent}" font-family="'CommitMono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="600" letter-spacing="1.2">${group.title}</text>\n`;
    let x = 28;
    const pillY = y + 12;

    for (const item of group.items) {
      const pillW = Math.max(66, item.length * 7.6 + 24);
      rowsSvg += `
        <rect x="${x}" y="${pillY}" width="${pillW}" height="28" rx="6" fill="${c.well}" stroke="${c.line}" stroke-width="1"/>
        <text x="${x + pillW / 2}" y="${pillY + 18}" text-anchor="middle" fill="${c.text1}" font-family="'CommitMono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12">${item}</text>
      `;
      x += pillW + 8;
    }
    y += 72;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${c.panel}" stroke="${c.line}" stroke-width="1"/>
  <circle cx="28" cy="28" r="4" fill="${c.accent}"/>
  <text x="42" y="32" fill="${c.text1}" font-family="'CommitMono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" font-weight="600">Tech Stack &amp; Languages</text>
  <text x="${width - 28}" y="32" text-anchor="end" fill="${c.text3}" font-family="'CommitMono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11">PRODUCTION TOOLING</text>
  <line x1="20" y1="48" x2="${width - 20}" y2="48" stroke="${c.line}" stroke-width="1"/>
  ${rowsSvg}
</svg>`;
}

fs.writeFileSync(path.join(genDir, 'repos-dark.svg'), renderStackSvg('dark'), 'utf8');
fs.writeFileSync(path.join(genDir, 'repos-light.svg'), renderStackSvg('light'), 'utf8');
console.log('Generated valid Copper Tech Stack SVGs.');