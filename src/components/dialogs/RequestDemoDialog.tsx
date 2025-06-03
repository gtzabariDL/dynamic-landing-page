'use client';

import React, { useState } from 'react';
import UIDialog from '../ui/UIDialog';
import { useDialog } from '../../lib/providers/DialogProvider';
import { DoorLoopLogo } from '../ui/DoorLoopLogo';
import { trackEmailBegan } from '../../lib/utils/analytics';
import { navigateToDemoForm } from '../../lib/utils/navigation';

interface RequestDemoDialogProps {
  onClose: VoidFunction;
}

export default function RequestDemoDialog({ onClose }: RequestDemoDialogProps) {
  const { isDialogOpen } = useDialog();
  const [email, setEmail] = useState('');
  const [hasTrackedEmailBegan, setHasTrackedEmailBegan] = useState(false);

  const isOpen = isDialogOpen('request-demo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    navigateToDemoForm(email);
    onClose();
    setEmail('');
    setHasTrackedEmailBegan(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Track email began when user starts typing (only once)
    if (newEmail.length > 0 && !hasTrackedEmailBegan) {
      trackEmailBegan();
      setHasTrackedEmailBegan(true);
    }
  };

  const header = (
    <div className="flex justify-center">
      <DoorLoopLogo color="blue" width={180} height={50} />
    </div>
  );

  const footer = (
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-4">AS SEEN ON</p>
      <div className="flex justify-center items-center gap-8 opacity-40">
        <div className="text-gray-400 font-bold text-lg">abc</div>
        <div className="text-gray-400 font-bold text-lg">CBS</div>
        <div className="text-gray-400 font-bold text-lg">FOX NEWS</div>
        <div className="text-gray-400 font-bold text-lg">NBC</div>
      </div>
    </div>
  );

  return (
    <UIDialog
      open={isOpen}
      onOpenChange={() => onClose()}
      title="Request a Demo"
      description="Schedule a demo for DoorLoop property management software in 36 seconds"
      header={header}
      footer={footer}
      className="max-w-md"
      contentClassName="px-2"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-center items-center mb-14">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">REQUEST A DEMO</h2>
          <p className="text-center text-gray-600">Schedule a demo in 36 seconds.</p>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </UIDialog>
  );
}
