'use client';

import React, { useState } from 'react';
import UIDialog from '../ui/UIDialog';
import { UIErrorMessage } from '../ui/UIErrorMessage';
import { useDialog } from '../../lib/providers/DialogProvider';
import { DoorLoopLogo } from '../ui/DoorLoopLogo';
import { trackEmailAttempt, trackEmailBegan } from '../../lib/utils/analytics';
import { navigateToDemoForm } from '../../lib/utils/navigation';
import { validateEmail, getErrorMessage } from '../../lib/utils/validation';
import Image from 'next/image';

interface RequestDemoDialogProps {
  onClose: VoidFunction;
}

export default function RequestDemoDialog({ onClose }: RequestDemoDialogProps) {
  const { isDialogOpen } = useDialog();
  const [email, setEmail] = useState('');
  const [hasTrackedEmailBegan, setHasTrackedEmailBegan] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOpen = isDialogOpen('request-demo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    trackEmailAttempt();
    setIsSubmitting(true);
    setError('');

    try {
      const validation = await validateEmail(email.trim());

      if (!validation.isValid) {
        setError(getErrorMessage(validation.result));
        setIsSubmitting(false);
        return;
      }

      navigateToDemoForm(email);
      onClose();
      setEmail('');
      setHasTrackedEmailBegan(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (error) {
      setError('');
    }

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
      <div className="flex justify-center items-center gap-6 opacity-60">
        <Image src="abc.svg" alt="ABC" width={48} height={48} className="h-8 w-auto" />
        <Image src="cbs.svg" alt="CBS" width={48} height={48} className="h-8 w-auto" />
        <Image
          src="the-real-deal.svg"
          alt="The Real Deal"
          width={64}
          height={32}
          className="h-3 w-auto"
        />
        <Image src="fox-news.svg" alt="FOX News" width={48} height={48} className="h-8 w-auto" />
        <Image src="nbc.svg" alt="NBC" width={48} height={48} className="h-8 w-auto" />
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
          <UIErrorMessage message={error} variant="dialog" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isSubmitting ? 'Validating...' : 'Continue'}
        </button>
      </form>
    </UIDialog>
  );
}
