import { Suspense } from 'react';
import { dialogsConfig } from '../dialogs/dialogs-config';
import { DialogProvider } from '../../lib/providers/DialogProvider';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DialogProvider dialogs={dialogsConfig}>{children}</DialogProvider>
    </Suspense>
  );
}
