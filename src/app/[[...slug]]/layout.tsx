export async function generateStaticParams() {
  const slugs = [
    'best-online-rental-property-management-software',
    'rental-property-management-system',
    'best-real-estate-property-management-software',
    'resident-property-management-software',
    'best-rental-property-management-accounting-software',
    'bookkeeping-rental-property-management-software',
    'best-rent-collection-software-landlord',
    'best-residential-rental-property-management-software',
    'rental-property-maintenance-software',
    'commercial-property-management-software',
  ];

  const params = slugs.map((slug) => ({
    slug: [slug],
  }));

  params.push({ slug: [] });

  return params;
}

interface SlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug?: string[];
  }>;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return <>{children}</>;
}
