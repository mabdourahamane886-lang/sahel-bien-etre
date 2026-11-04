import catalog from '../product-catalog.json';

type Product = { id: string; reference: string; name: string; category: string; description: string; image_url?: string | null; price_xof?: number | null };

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] as string));

export default function handler(req: any, res: any) {
  const id = String(req.query.id || req.query.slug || '');
  const product = (catalog as Product[]).find(item => item.reference === id || item.id === id);
  if (!product) {
    res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end('<!doctype html><html lang="fr"><meta charset="utf-8"><title>Produit introuvable — Sahel Bien-Être</title><body><h1>Produit introuvable</h1><a href="/">Retour à la boutique</a></body></html>');
  }
  const base = 'https://sahel-bien-etre-iz3z.vercel.app';
  const url = base + '/produit/' + encodeURIComponent(product.reference);
  const image = product.image_url || base + '/sahel-logo.svg';
  const title = product.name + ' | Sahel Bien-Être';
  const description = product.description || 'Découvrez ce produit chez Sahel Bien-Être à Niamey.';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).end(`<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta property="og:type" content="product"><meta property="og:site_name" content="Sahel Bien-Être">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(url)}"><meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:image:alt" content="${escapeHtml(product.name)}"><meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(image)}">
<meta http-equiv="refresh" content="0;url=${escapeHtml(url)}"></head>
<body><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(description)}</p><p><a href="${escapeHtml(url)}">Voir le produit sur Sahel Bien-Être</a></p></body></html>`);
}
