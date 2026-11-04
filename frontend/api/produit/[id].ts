import catalog from '../product-catalog.json';

type Product = { id: string; reference: string; name: string; category: string; description: string; image_url?: string | null; price_xof?: number | null };

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] as string));
const slugify = (value: string) => value.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function handler(req: any, res: any) {
  const requested = decodeURIComponent(String(req.query.id || req.query.slug || '')).trim().toLowerCase();
  const product = (catalog as Product[]).find(item =>
    item.reference.toLowerCase() === requested ||
    item.id.toLowerCase() === requested ||
    slugify(item.name) === requested
  );
  if (!product) {
    res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end('<!doctype html><html lang="fr"><meta charset="utf-8"><title>Produit introuvable — Sahel Bien-Être</title><body><h1>Produit introuvable</h1><a href="/">Retour à la boutique</a></body></html>');
  }
  const base = 'https://sahel-bien-etre.win';
  const slug = slugify(product.name);
  const url = base + '/produit/' + encodeURIComponent(slug);
  const image = product.image_url && product.image_url.trim().toLowerCase().startsWith('https://') ? product.image_url.trim() : 'https://www.foreverlivingmexico.com/images/ForeverAloeVeraGel.png';
  const title = product.name + ' | Sahel Bien-Être';
  const description = product.description || 'Découvrez ce produit chez Sahel Bien-Être à Niamey.';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).end(`<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta property="og:type" content="product"><meta property="og:site_name" content="Sahel Bien-Être">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(url)}"><meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:image:alt" content="${escapeHtml(product.name)}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:secure_url" content="${escapeHtml(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="1200"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(image)}">
</head><body><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(description)}</p><p><a href="/">Voir tous les produits sur Sahel Bien-Être</a></p></body></html>`);
}
