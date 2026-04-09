import { SocialAssetStudio } from '../../../../components/SocialAssetStudio';

export const metadata = {
  title: 'Social Asset Studio | Bridge2Partners',
  description: 'Deterministic render engine for Bridge2Partners social content.',
};



export default async function SocialAssetStudioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SocialAssetStudio projectId={id} />;
}
