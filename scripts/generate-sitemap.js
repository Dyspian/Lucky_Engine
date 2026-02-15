import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://lucky-engine.com"; // Change to your actual domain

const staticRoutes = [
  '/',
  '/draws',
  '/legal',
  '/wiki',
  '/generator', // Alias
  '/historiek', // Alias
  '/statistiek', // New SEO page
  '/meest-gevallen-nummers', // New SEO page
  '/lucky-stars', // New SEO page
  '/kansberekening', // New SEO page
  '/patronen', // New SEO page
  '/ai-analyse', // New SEO page
  '/analyse-tool', // New SEO page
];

const generateSitemap = () => {
  console.log('Generating Sitemap...');
  
  // 1. Static Routes
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // 2. Programmatic Number Routes (1-50)
  for (let i = 1; i <= 50; i++) {
    xml += `
  <url>
    <loc>${SITE_URL}/nummers/${i}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // 3. Programmatic Star Routes (1-12)
  for (let i = 1; i <= 12; i++) {
    xml += `
  <url>
    <loc>${SITE_URL}/sterren/${i}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  // Write to public folder
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)){
      fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ sitemap.xml generated in public/');
};

generateSitemap();