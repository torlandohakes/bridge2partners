import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Dashboard',
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
