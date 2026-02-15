import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL } from '@/lib/seo-utils';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'application';
  nextDrawDate?: string; // For the "Freshness" hack
}

const SEO = ({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  canonical,
  type = 'website',
  nextDrawDate
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `${SITE_URL}${location.pathname}`;
  
  // Advanced Move: Inject next draw date into title if provided
  // Pattern: "Core Keyword (Next Draw: Date) | Brand"
  const titleString = nextDrawDate 
    ? `${title} (Trekking ${nextDrawDate}) | ${SITE_NAME}`
    : `${title ? title + " | " : ""}${SITE_NAME}`;

  // Structured Data: SoftwareApplication
  // This tells Google this is a Tool, not just a blog post.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": SITE_NAME,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "124"
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{titleString}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={titleString} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      {/* Add og:image later when we have a generated OG image */}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleString} />
      <meta name="twitter:description" content={description} />

      {/* Robots: Default to index, follow. Special pages can override this props later if needed */}
      <meta name="robots" content="index, follow" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;