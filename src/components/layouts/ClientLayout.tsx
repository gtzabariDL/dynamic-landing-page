import { Suspense } from 'react';
import { dialogsConfig } from '../dialogs/dialogs-config';
import { DialogProvider } from '../../lib/providers/DialogProvider';
// import { VisitTrackerProvider } from '../../lib/providers/VisitTrackerProvider';
import { I18nProvider } from '../../lib/providers/I18nProvider';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <I18nProvider>
      {/* <VisitTrackerProvider> */}
      <Suspense fallback={<div style={{ display: 'none' }}>Loading...</div>}>
        <DialogProvider dialogs={dialogsConfig}>{children}</DialogProvider>
      </Suspense>
      {/* </VisitTrackerProvider> */}
    </I18nProvider>
  );
}
