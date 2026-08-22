import TVDetailsClient from './TVDetailsClient';

interface TVDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: '1396' },
    { id: '1399' },
  ];
}

export default async function TVDetailsPage({ params }: TVDetailsProps) {
  return <TVDetailsClient params={params} />;
}
