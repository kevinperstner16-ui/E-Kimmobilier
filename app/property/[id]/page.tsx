import PropertyDetailClient from '@/components/PropertyDetailClient';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;

  return <PropertyDetailClient id={id} />;
}
