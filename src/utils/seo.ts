// SEO optimization utilities

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

// Update document title
export const updateTitle = (title: string, siteName: string = 'DoneKick') => {
  document.title = `${title} | ${siteName}`;
};

// Update meta description
export const updateMetaDescription = (description: string) => {
  let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  
  metaDescription.content = description;
};

// Update meta keywords
export const updateMetaKeywords = (keywords: string[]) => {
  let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
  
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  
  metaKeywords.content = keywords.join(', ');
};

// Update Open Graph meta tags
export const updateOpenGraphTags = (config: SEOConfig) => {
  const ogTags = [
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.type || 'website' },
    { property: 'og:site_name', content: config.siteName || 'DoneKick' },
  ];

  if (config.image) {
    ogTags.push({ property: 'og:image', content: config.image });
  }

  if (config.url) {
    ogTags.push({ property: 'og:url', content: config.url });
  }

  ogTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[property="${tag.property}"]`) as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', tag.property);
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = tag.content;
  });
};

// Update Twitter Card meta tags
export const updateTwitterCardTags = (config: SEOConfig) => {
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
  ];

  if (config.image) {
    twitterTags.push({ name: 'twitter:image', content: config.image });
  }

  twitterTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = tag.name;
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = tag.content;
  });
};

// Update canonical URL
export const updateCanonicalUrl = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
};

// Add structured data (JSON-LD)
export const addStructuredData = (data: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Generate product structured data
export const generateProductStructuredData = (product: any) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.vendor.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${window.location.origin}/product/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": product.vendor.name
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    } : undefined
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate organization structured data
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DoneKick",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "description": "Your ultimate destination for authentic sneakers and premium athletic footwear",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-KICK",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/donekick",
      "https://twitter.com/donekick",
      "https://instagram.com/donekick"
    ]
  };
};

// Update all SEO meta tags
export const updateSEO = (config: SEOConfig) => {
  updateTitle(config.title);
  updateMetaDescription(config.description);
  
  if (config.keywords) {
    updateMetaKeywords(config.keywords);
  }
  
  updateOpenGraphTags(config);
  updateTwitterCardTags(config);
  
  if (config.url) {
    updateCanonicalUrl(config.url);
  }
};

// SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Authentic Sneakers & Athletic Footwear',
    description: 'Discover authentic sneakers from top brands. Shop the latest releases, limited editions, and classic styles at DoneKick.',
    keywords: ['sneakers', 'athletic footwear', 'authentic shoes', 'nike', 'adidas', 'jordan'],
    type: 'website'
  },
  
  products: {
    title: 'Shop All Sneakers',
    description: 'Browse our complete collection of authentic sneakers from top brands. Find your perfect pair with our advanced filtering options.',
    keywords: ['sneakers collection', 'buy sneakers', 'authentic footwear', 'shoe store'],
    type: 'website'
  },
  
  product: (product: any) => ({
    title: product.name,
    description: `${product.name} by ${product.vendor.name}. ${product.description}`,
    keywords: [product.name, product.vendor.name, product.category, 'sneakers'],
    image: product.images[0],
    type: 'product'
  }),
  
  about: {
    title: 'About DoneKick',
    description: 'Learn about DoneKick\'s mission to provide authentic sneakers and build a global community of sneaker enthusiasts.',
    keywords: ['about donekick', 'sneaker marketplace', 'authentic shoes'],
    type: 'website'
  },
  
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with DoneKick for support, questions, or vendor inquiries. We\'re here to help!',
    keywords: ['contact donekick', 'customer support', 'help'],
    type: 'website'
  }
};

// Initialize SEO for the application
export const initSEO = () => {
  // Add organization structured data
  addStructuredData(generateOrganizationStructuredData());
  
  // Add viewport meta tag
  let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewport);
  }
  
  // Add charset meta tag
  let charset = document.querySelector('meta[charset]') as HTMLMetaElement;
  if (!charset) {
    charset = document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    document.head.insertBefore(charset, document.head.firstChild);
  }
  
  console.log('SEO optimizations initialized');
};
