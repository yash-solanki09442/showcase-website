/**
 * Showcase — shared product catalog (loaded before app.js)
 */
(function (global) {
  const EUR_RATE = 0.92;

  const CATEGORIES = [
    'All',
    'Clothing',
    'Jewellery',
    'Shoes',
    'Lifestyle',
    'Merchandise',
  ];

  const products = [
    {
      id: 'atelier-silk-coat',
      name: 'Atelier Silk Coat',
      category: 'Clothing',
      priceUsd: 4280,
      description:
        'Double-faced silk crepe coat with hand-finished seams and horn buttons. Cut for an elongated silhouette with subtle shoulder structure.',
      images: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80',
      ],
      colors: ['Ivory', 'Noir'],
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 4.9,
      reviewCount: 24,
    },
    {
      id: 'maison-cashmere-set',
      name: 'Maison Cashmere Set',
      category: 'Clothing',
      priceUsd: 1890,
      description:
        'Two-piece knit in Grade-A Mongolian cashmere. Relaxed trouser and crew-neck sweater with ribbed cuffs.',
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
      ],
      colors: ['Camel', 'Charcoal', 'Cream'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviewCount: 41,
    },
    {
      id: 'riviera-linen-blazer',
      name: 'Riviera Linen Blazer',
      category: 'Clothing',
      priceUsd: 2450,
      description:
        'Unstructured Italian linen blazer with mother-of-pearl buttons and half-canvas construction.',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80',
      ],
      colors: ['Sand', 'Slate'],
      sizes: ['38', '40', '42', '44'],
      rating: 4.7,
      reviewCount: 18,
    },
    {
      id: 'signature-diamond-pendant',
      name: 'Signature Diamond Pendant',
      category: 'Jewellery',
      priceUsd: 12400,
      description:
        '0.75ct brilliant-cut diamond in 18k white gold on an adjustable trace chain. GIA certified.',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80',
      ],
      colors: ['White Gold', 'Yellow Gold'],
      sizes: ['16"', '18"', '20"'],
      rating: 5.0,
      reviewCount: 12,
    },
    {
      id: 'heritage-pearl-cuff',
      name: 'Heritage Pearl Cuff',
      category: 'Jewellery',
      priceUsd: 3200,
      description:
        'South Sea pearls set in brushed 18k gold cuff. Limited atelier edition of 50 pieces.',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80',
      ],
      colors: ['Gold'],
      sizes: ['One Size'],
      rating: 4.9,
      reviewCount: 9,
    },
    {
      id: 'celestial-hoop-earrings',
      name: 'Celestial Hoop Earrings',
      category: 'Jewellery',
      priceUsd: 1680,
      description:
        'Sculptural hoops in polished rose gold with pavé diamond interior. Lightweight for all-day wear.',
      images: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
      ],
      colors: ['Rose Gold', 'Platinum'],
      sizes: ['Small', 'Medium'],
      rating: 4.8,
      reviewCount: 33,
    },
    {
      id: 'capri-leather-loafer',
      name: 'Capri Leather Loafer',
      category: 'Shoes',
      priceUsd: 980,
      description:
        'Hand-burnished calfskin loafer with leather sole and cushioned insole. Made in Florence.',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80',
      ],
      colors: ['Espresso', 'Bordeaux', 'Noir'],
      sizes: ['39', '40', '41', '42', '43', '44'],
      rating: 4.9,
      reviewCount: 56,
    },
    {
      id: 'monochrome-ankle-boot',
      name: 'Monochrome Ankle Boot',
      category: 'Shoes',
      priceUsd: 1450,
      description:
        'Suede ankle boot with stacked heel and side zip. Leather lining and Goodyear welt.',
      images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80',
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&q=80',
      ],
      colors: ['Black', 'Taupe'],
      sizes: ['36', '37', '38', '39', '40', '41'],
      rating: 4.7,
      reviewCount: 29,
    },
    {
      id: 'atelier-slingback',
      name: 'Atelier Slingback',
      category: 'Shoes',
      priceUsd: 1120,
      description:
        'Pointed slingback in nappa leather with architectural heel. Signature Showcase buckle detail.',
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80',
      ],
      colors: ['Nude', 'Black'],
      sizes: ['35', '36', '37', '38', '39', '40'],
      rating: 4.8,
      reviewCount: 22,
    },
    {
      id: 'noir-crystal-decanter',
      name: 'Noir Crystal Decanter Set',
      category: 'Lifestyle',
      priceUsd: 890,
      description:
        'Hand-cut crystal decanter and two tumblers in smoked glass. Presented in linen gift case.',
      images: [
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      ],
      colors: ['Smoke', 'Clear'],
      sizes: ['Set'],
      rating: 4.6,
      reviewCount: 15,
    },
    {
      id: 'cashmere-travel-throw',
      name: 'Cashmere Travel Throw',
      category: 'Lifestyle',
      priceUsd: 650,
      description:
        'Lightweight cashmere throw with hand-rolled fringe. Ideal for travel or home layering.',
      images: [
        'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1200&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      ],
      colors: ['Oat', 'Midnight', 'Stone'],
      sizes: ['130×180cm'],
      rating: 4.9,
      reviewCount: 38,
    },
    {
      id: 'signature-scent-collection',
      name: 'Signature Scent Collection',
      category: 'Lifestyle',
      priceUsd: 420,
      description:
        'Three 50ml eaux in leather-wrapped atomizers: Bois, Fleur, and Ambre. Grasse formulation.',
      images: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80',
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80',
      ],
      colors: ['Trio Set'],
      sizes: ['50ml × 3'],
      rating: 4.8,
      reviewCount: 67,
    },
    {
      id: 'showcase-monogram-tote',
      name: 'Showcase Monogram Tote',
      category: 'Merchandise',
      priceUsd: 2100,
      description:
        'Structured canvas and leather tote with embossed monogram. Interior zip pocket and key holder.',
      images: [
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80',
      ],
      colors: ['Ecru', 'Noir'],
      sizes: ['One Size'],
      rating: 4.9,
      reviewCount: 84,
    },
    {
      id: 'atelier-silk-scarf',
      name: 'Atelier Silk Scarf',
      category: 'Merchandise',
      priceUsd: 580,
      description:
        '90×90cm silk twill with hand-rolled edges. Archive print inspired by Parisian ateliers.',
      images: [
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80',
      ],
      colors: ['Gold', 'Navy', 'Burgundy'],
      sizes: ['90cm'],
      rating: 4.7,
      reviewCount: 51,
    },
    {
      id: 'limited-art-print',
      name: 'Limited Art Print No. 07',
      category: 'Merchandise',
      priceUsd: 1200,
      description:
        'Archival giclée on cotton rag, signed and numbered. Framed in ash wood with museum glass.',
      images: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
        'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
      ],
      colors: ['Natural Frame'],
      sizes: ['60×80cm'],
      rating: 5.0,
      reviewCount: 8,
    },
    {
      id: 'heritage-chronograph',
      name: 'Heritage Chronograph',
      category: 'Jewellery',
      priceUsd: 8900,
      description:
        'Swiss automatic movement in 18k rose gold case with sapphire exhibition back. Alligator strap.',
      images: [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
      ],
      colors: ['Rose Gold', 'Steel'],
      sizes: ['40mm'],
      rating: 4.9,
      reviewCount: 14,
    },
  ];

  function getProductById(id) {
    return products.find((p) => p.id === id) || null;
  }

  function formatPrice(usd, currency) {
    const cur = currency || 'USD';
    const value = cur === 'EUR' ? usd * EUR_RATE : usd;
    const symbol = cur === 'EUR' ? '€' : '$';
    return (
      symbol +
      value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }

  global.ShowcaseCatalog = {
    EUR_RATE,
    CATEGORIES,
    products,
    getProductById,
    formatPrice,
  };
})(typeof window !== 'undefined' ? window : globalThis);
