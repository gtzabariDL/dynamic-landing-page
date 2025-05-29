/**
 * DLMC Cookie Management Utility
 *
 * Handles visitor attribution tracking with UTM parameters,
 * localStorage synchronization, and cookie management.
 */

export interface DLMCData {
  firstWebsiteVisitAt: string;
  referrer: string;
  landingPage: string;
  utmTerm: string;
  utmCampaign: string;
  utmSource: string;
  utmMedium: string;
  utmContent: string;
  adwordsGclid?: string;
  msClkid?: string;
  linkedinId?: string;
  campaignID?: string;
  adgroupID?: string;
  keywordID?: string;
  utmSourcesAll: string;
  utmCampaignsAll: string;
  utmTermsAll: string;
  utmMediumsAll: string;
  utmContentsAll: string;
  keywordIdAll?: string;
  utmSourceLast: string;
  utmCampaignLast: string;
  utmMediumLast: string;
  utmTermLast: string;
  utmContentLast: string;
  irclickid?: string;
  irpid?: string;
  sharedid?: string;
  iradname?: string;
}

interface URLParams {
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  msclkid?: string;
  li_fat_id?: string;
  campaign_ID?: string;
  adgroup_ID?: string;
  keyword_ID?: string;
  irclickid?: string;
  irpid?: string;
  sharedid?: string;
  iradname?: string;
}

/**
 * Cookie Management Functions
 */
export class CookieManager {
  static set(name: string, value: string, days: number): void {
    if (typeof window === 'undefined') return;

    try {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }

      const domainParts = window.location.hostname.split('.');
      const rootDomain =
        domainParts.length > 2 ? domainParts.slice(-2).join('.') : window.location.hostname;

      document.cookie =
        name +
        '=' +
        encodeURIComponent(value) +
        expires +
        '; path=/; domain=' +
        rootDomain +
        '; SameSite=Lax; Secure';

      console.log(`✅ DLMC: Cookie '${name}' set successfully`);
    } catch (error) {
      console.error('❌ DLMC: Error setting cookie:', error);
    }
  }

  static get(name: string): string | null {
    if (typeof window === 'undefined') return null;

    try {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');

      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
    } catch (error) {
      console.error('❌ DLMC: Error getting cookie:', error);
    }
    return null;
  }
}

/**
 * URL Parameter Extraction
 */
export class URLAnalyzer {
  static extractUTMParams(): URLParams {
    if (typeof window === 'undefined') return {};

    const params: URLParams = {};
    const urlParams = new URLSearchParams(window.location.search);

    // Extract all URL parameters
    urlParams.forEach((value, key) => {
      if (
        key in params ||
        key.startsWith('utm_') ||
        [
          'gclid',
          'msclkid',
          'li_fat_id',
          'campaign_ID',
          'adgroup_ID',
          'keyword_ID',
          'irclickid',
          'irpid',
          'sharedid',
          'iradname',
        ].includes(key)
      ) {
        (params as Record<string, string>)[key] = value;
      }
    });

    return params;
  }

  static getDefaultUTMSource(): string {
    if (typeof window === 'undefined') return 'direct';

    const pathname = window.location.pathname;

    if (
      pathname.includes('/resources/') ||
      pathname.includes('/laws/') ||
      pathname.includes('/forms/') ||
      pathname.includes('/hub') ||
      pathname.includes('/blog/') ||
      pathname.includes('/definitions/')
    ) {
      return 'blog';
    }

    if (pathname.includes('/webinars/')) return 'webinar';
    if (pathname.includes('/podcasts/')) return 'podcast';

    return 'direct';
  }

  static cleanReferrerURL(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  }

  static extractNumber(str: string): string {
    const match = str.match(/\d+/);
    return match ? match[0] : str;
  }
}

/**
 * DLMC Data Processing
 */
export class DLMCProcessor {
  static processUTMParameters(params: URLParams): URLParams {
    const processed = { ...params };

    // Set default UTM source if not present
    if (!processed.utm_source) {
      processed.utm_source = URLAnalyzer.getDefaultUTMSource();
    }

    // Set defaults for missing UTM parameters
    processed.utm_term = processed.utm_term || 'direct';
    processed.utm_campaign = processed.utm_campaign || 'direct';
    processed.utm_content = processed.utm_content || 'direct';
    processed.utm_medium = processed.utm_medium || 'direct';

    // Handle special cases
    if (processed.utm_source?.includes('site_source')) {
      const brokenValue = 'fb_broken';
      processed.utm_source = brokenValue;
      processed.utm_term = brokenValue;
      processed.utm_medium = brokenValue;
      processed.utm_campaign = brokenValue;
      processed.utm_content = brokenValue;
    }

    // Decode Facebook/Instagram campaigns
    if (
      (processed.utm_source === 'fb' || processed.utm_source === 'ig') &&
      processed.utm_campaign
    ) {
      processed.utm_campaign = decodeURIComponent(processed.utm_campaign.replace(/\+/g, ' '));
    }

    // Normalize source
    if (processed.utm_source === 'an') {
      processed.utm_source = 'fb';
    }

    // Extract keyword ID numbers
    if (processed.keyword_ID) {
      processed.keyword_ID = URLAnalyzer.extractNumber(processed.keyword_ID);
    }

    return processed;
  }

  static createInitialDLMCData(params: URLParams): DLMCData {
    const referrer = typeof window !== 'undefined' ? document.referrer : '';

    return {
      firstWebsiteVisitAt: new Date().toISOString(),
      referrer: referrer || 'direct',
      landingPage: typeof window !== 'undefined' ? window.location.pathname : '/',
      utmTerm: params.utm_term || 'direct',
      utmCampaign: params.utm_campaign || 'direct',
      utmSource: params.utm_source || 'direct',
      utmMedium: params.utm_medium || 'direct',
      utmContent: params.utm_content || 'direct',
      adwordsGclid: params.gclid,
      msClkid: params.msclkid,
      linkedinId: params.li_fat_id,
      campaignID: params.campaign_ID,
      adgroupID: params.adgroup_ID,
      keywordID: params.keyword_ID,
      utmSourcesAll: params.utm_source || 'direct',
      utmCampaignsAll: params.utm_campaign || 'direct',
      utmTermsAll: params.utm_term || 'direct',
      utmMediumsAll: params.utm_medium || 'direct',
      utmContentsAll: params.utm_content || 'direct',
      keywordIdAll: params.keyword_ID,
      utmSourceLast: params.utm_source || 'direct',
      utmCampaignLast: params.utm_campaign || 'direct',
      utmMediumLast: params.utm_medium || 'direct',
      utmTermLast: params.utm_term || 'direct',
      utmContentLast: params.utm_content || 'direct',
      irclickid: params.irclickid,
      irpid: params.irpid,
      sharedid: params.sharedid,
      iradname: params.iradname,
    };
  }

  static updateExistingDLMCData(existing: DLMCData, params: URLParams): DLMCData {
    const updated = { ...existing };

    // Initialize arrays if they don't exist
    updated.utmSourcesAll = updated.utmSourcesAll || '';
    updated.utmCampaignsAll = updated.utmCampaignsAll || '';
    updated.utmMediumsAll = updated.utmMediumsAll || '';
    updated.utmTermsAll = updated.utmTermsAll || '';
    updated.utmContentsAll = updated.utmContentsAll || '';
    updated.keywordIdAll = updated.keywordIdAll || '';

    // Append new UTM data if different from last
    if (params.utm_source && params.utm_source !== updated.utmSourceLast) {
      updated.utmSourcesAll += updated.utmSourcesAll ? ',' + params.utm_source : params.utm_source;
      updated.utmSourceLast = params.utm_source;
    }

    if (params.utm_campaign && params.utm_campaign !== updated.utmCampaignLast) {
      updated.utmCampaignsAll += updated.utmCampaignsAll
        ? ',' + params.utm_campaign
        : params.utm_campaign;
      updated.utmCampaignLast = params.utm_campaign;
    }

    if (params.utm_term && params.utm_term !== updated.utmTermLast) {
      updated.utmTermsAll += updated.utmTermsAll ? ',' + params.utm_term : params.utm_term;
      updated.utmTermLast = params.utm_term;
    }

    if (params.utm_medium && params.utm_medium !== updated.utmMediumLast) {
      updated.utmMediumsAll += updated.utmMediumsAll ? ',' + params.utm_medium : params.utm_medium;
      updated.utmMediumLast = params.utm_medium;
    }

    if (params.utm_content && params.utm_content !== updated.utmContentLast) {
      updated.utmContentsAll += updated.utmContentsAll
        ? ',' + params.utm_content
        : params.utm_content;
      updated.utmContentLast = params.utm_content;
    }

    if (params.keyword_ID) {
      updated.keywordIdAll += updated.keywordIdAll ? ',' + params.keyword_ID : params.keyword_ID;
    }

    return updated;
  }
}

/**
 * PostHog Integration
 */
export class PostHogIntegrator {
  static updatePostHogProperties(params: URLParams): void {
    if (typeof window === 'undefined' || !window.posthog?.capture) return;

    const referrer = document.referrer;

    // Only update if not from internal referrer
    if (referrer.includes('doorloop.com') || referrer.includes('doorloopcrm')) return;

    try {
      window.posthog.capture('$set', {
        $set: {
          campaign_id_last_touch: params.campaign_ID || 'null',
          keyword_id_last_touch: params.keyword_ID || 'null',
          adgroup_id_last_touch: params.adgroup_ID || 'null',
        },
        $set_once: {
          initial_campaign_id: params.campaign_ID || 'null',
          initial_keyword_id: params.keyword_ID || 'null',
          initial_adgroup_id: params.adgroup_ID || 'null',
          $initial_utm_source: params.utm_source || 'direct',
          $initial_utm_campaign: params.utm_campaign || 'direct',
          $initial_utm_content: params.utm_content || 'direct',
          $initial_utm_medium: params.utm_medium || 'direct',
          $initial_utm_term: params.utm_term || 'direct',
        },
        campaign_id: params.campaign_ID || 'null',
        keyword_id: params.keyword_ID || 'null',
        adgroup_id: params.adgroup_ID || 'null',
        utm_source: params.utm_source || 'direct',
        utm_campaign: params.utm_campaign || 'direct',
        utm_content: params.utm_content || 'direct',
        utm_medium: params.utm_medium || 'direct',
        utm_term: params.utm_term || 'direct',
      });

      console.log('✅ DLMC: PostHog properties updated');
    } catch (error) {
      console.error('❌ DLMC: Error updating PostHog properties:', error);
    }
  }
}

/**
 * Main DLMC Management Class
 */
export class DLMCManager {
  private static readonly STORAGE_KEY = 'dlmc';
  private static readonly COOKIE_EXPIRY_DAYS = 365;
  private static syncInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize DLMC tracking system
   */
  static async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Skip if on join page with fpr parameter
    if (window.location.href.indexOf('/join?fpr=') > -1) {
      console.log('⏭️ DLMC: Skipping initialization for join page');
      return;
    }

    try {
      console.log('🚀 DLMC: Initializing tracking system...');

      // Extract and process URL parameters
      const rawParams = URLAnalyzer.extractUTMParams();
      const processedParams = DLMCProcessor.processUTMParameters(rawParams);

      // Update PostHog properties
      PostHogIntegrator.updatePostHogProperties(processedParams);

      // Manage DLMC data
      await this.manageDLMCData(processedParams);

      // Start synchronization
      this.startSync();

      console.log('✅ DLMC: Initialization complete');
    } catch (error) {
      console.error('❌ DLMC: Initialization failed:', error);
    }
  }

  /**
   * Get current DLMC data
   */
  static getDLMCData(): DLMCData | null {
    if (typeof window === 'undefined') return null;

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('❌ DLMC: Error retrieving data:', error);
      return null;
    }
  }

  /**
   * Manually sync localStorage with cookie
   */
  static syncWithCookie(): void {
    if (typeof window === 'undefined') return;

    try {
      const storageData = localStorage.getItem(this.STORAGE_KEY);
      const cookieData = CookieManager.get(this.STORAGE_KEY);

      if (storageData && storageData !== cookieData) {
        CookieManager.set(this.STORAGE_KEY, storageData, this.COOKIE_EXPIRY_DAYS);
      }
    } catch (error) {
      console.error('❌ DLMC: Error syncing with cookie:', error);
    }
  }

  /**
   * Clean up and stop monitoring
   */
  static cleanup(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('🧹 DLMC: Cleanup complete');
    }
  }

  private static async manageDLMCData(params: URLParams): Promise<void> {
    const existingData = this.getDLMCData();
    const referrer = document.referrer;

    let dlmcData: DLMCData;

    if (!existingData) {
      // First visit - create new data
      dlmcData = DLMCProcessor.createInitialDLMCData(params);
      console.log('🆕 DLMC: First visit detected, creating new data');
    } else if (!referrer.includes('doorloop')) {
      // Returning visit from external source - update existing data
      dlmcData = DLMCProcessor.updateExistingDLMCData(existingData, params);
      console.log('🔄 DLMC: External return visit, updating data');
    } else {
      // Internal navigation - no update needed
      console.log('🏠 DLMC: Internal navigation, no update needed');
      return;
    }

    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dlmcData));

    // Sync with cookie
    this.syncWithCookie();
  }

  private static startSync(): void {
    if (this.syncInterval) return; // Already running

    let lastValue = localStorage.getItem(this.STORAGE_KEY);

    this.syncInterval = setInterval(() => {
      try {
        const currentValue = localStorage.getItem(this.STORAGE_KEY);
        if (currentValue !== lastValue) {
          this.syncWithCookie();
          lastValue = currentValue;
        }
      } catch (error) {
        console.error('❌ DLMC: Error in sync monitoring:', error);
      }
    }, 1000);

    console.log('🔄 DLMC: Started localStorage monitoring');
  }
}
