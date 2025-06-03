import memoize from 'lodash/memoize';

export interface NeverbounceResponse {
  email: string;
  status: 'success' | string;
  result: 'valid' | 'catchall' | 'unknown' | 'invalid' | 'disposable';
  flags: Array<'has_dns' | 'smtp_connectable' | 'accepts_all' | string>;
  suggested_correction: string;
  execution_time: number;
}

export const getErrorMessage = (result: string): string => {
  switch (result) {
    case 'invalid_email':
      return 'Please enter a valid email address';
    case 'too_many_requests':
      return 'Too many requests. Please try again later';
    default:
      return 'Please enter a valid email address';
  }
};

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const validateEmail = memoize(
  async (
    email?: string
  ): Promise<{
    isValid: boolean;
    result: string;
  }> => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        isValid: false,
        result: 'invalid_email',
      };
    }

    const validationUrl = `https://validate-email-endpoint.vercel.app/api/validate-email?email=${encodeURIComponent(email)}`;
    try {
      const response = await fetchWithTimeout(
        validationUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
        10_000
      );
      const data: NeverbounceResponse = await response.json();

      if (response.status === 429) {
        return {
          isValid: false,
          result: 'too_many_requests',
        };
      }
      if (data.result === 'invalid' || data.result === 'disposable') {
        return {
          isValid: false,
          result: 'invalid_email',
        };
      }

      return {
        isValid: ['valid', 'catchall', 'unknown'].includes(data.result),
        result: data.result,
      };
    } catch {
      return {
        isValid: true,
        result: 'invalid_email',
      };
    }
  }
);

export { validateEmail };
