import fs from 'node:fs';
import path from 'node:path';

const profileDir = 'profile';
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

const groups = [
  {
    title: 'AI & AGENTS',
    items: ['Gemini API', 'LLaMA 3', 'MCP', 'RAG', 'LangChain', 'Ragas', 'Pinecone', 'pgvector']
  },
  {
    title: 'FULL-STACK & SYSTEMS',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'FastAPI', 'Express', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'CLOUD, DEVOPS & LANGUAGES',
    items: ['AWS (SAA-C03)', 'Docker', 'GitHub Actions', 'Linux', 'Python', 'TypeScript', 'C++', 'SQL']
  }
];

function renderStackSvg(mode) {
  const isDark = mode === 'dark';
  const c = isDark
    ? { bg: '#181818', panel: '#202020', well: '#262626', line: '#343434', text1: '#f2f2f2', text2: '#c7c7c7', text3: '#999999', accent: '#60a5fa' }
    : { bg: '#f6f6f4', panel: '#ffffff', well: '#f1f5f9', line: '#e2e8f0', text1: '#111827', text2: '#374151', text3: '#6b7280', accent: '#2563eb' };

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

fs.writeFileSync(path.join(profileDir, 'tech-stack-dark.svg'), renderStackSvg('dark'), 'utf8');
fs.writeFileSync(path.join(profileDir, 'tech-stack-light.svg'), renderStackSvg('light'), 'utf8');

// Update README.md: remove "more/selected repositories" block and insert native Tech Stack SVG
const readmePath = 'README.md';
let readme = fs.readFileSync(readmePath, 'utf8');

// Strip any existing "Selected repositories" / "more-repos" picture or img block
readme = readme.replace(/<p[^>]*>\s*<picture>[\s\S]*?(?:more-repos|selected-repos|repos-)[\s\S]*?<\/picture>\s*<\/p>/gi, '');
readme = readme.replace(/<picture>[\s\S]*?(?:more-repos|selected-repos|repos-)[\s\S]*?<\/picture>/gi, '');
readme = readme.replace(/<!-- STACK_SECTION -->[\s\S]*$/gi, '');

const stackPicture = `
<!-- STACK_SECTION -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./profile/tech-stack-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="./profile/tech-stack-light.svg" />
    <img alt="Tech Stack and Languages" src="./profile/tech-stack-dark.svg" width="880" />
  </picture>
</p>
`;

fs.writeFileSync(readmePath, readme.trimEnd() + '\n' + stackPicture, 'utf8');
console.log('Generated native tech-stack SVGs and updated README.md');