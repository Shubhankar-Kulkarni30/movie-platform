import MovieDetailsClient from './MovieDetailsClient';

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: '550' },
    { id: '27205' },
    { id: '157336' },
  ];
}

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  return <MovieDetailsClient params={params} />;
}
