import { Suspense } from 'react';
import { DialogProvider } from '../providers/DialogProvider';
import { dialogsConfig } from '../components/dialogs/dialogs-config';

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
