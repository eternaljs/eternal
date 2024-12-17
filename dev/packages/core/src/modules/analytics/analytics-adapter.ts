export interface AnalyticsAdapter {
  /**
   * Tracks an event with optional properties.
   */
  trackEvent(event: string, properties?: Record<string, unknown>): void;

  /**
   * Identifies a user with a unique ID and optional traits.
   */
  identifyUser(userId: string, traits?: Record<string, unknown>): void;

  /**
   * Tracks a page view with optional properties.
   */
  trackPageView(pageName: string, properties?: Record<string, unknown>): void;

  /**
   * Tracks a group or company associated with a user.
   */
  trackGroup(groupId: string, traits?: Record<string, unknown>): void;

  /**
   * Aliases a user ID, merging two identities.
   */
  aliasUser(newId: string, previousId: string): void;

  /**
   * Flushes any pending analytics data.
   */
  flushEvents(): Promise<void>;
}
