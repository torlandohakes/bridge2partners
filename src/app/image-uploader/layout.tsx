import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asset Uploader',
};

export default function ImageUploaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
