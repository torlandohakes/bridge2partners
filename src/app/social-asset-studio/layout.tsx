import { StudioAuthGuard } from '@/components/StudioAuthGuard';
import React from 'react';

export default function SocialAssetStudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioAuthGuard>
      {children}
    </StudioAuthGuard>
  );
}
