import { AnalyticsAdapter } from "./analytics-adapter";

export class AnalyticsModule {
  private adapter: AnalyticsAdapter;

  constructor(config: { adapter: AnalyticsAdapter }) {
    this.adapter = config.adapter;
  }

  /**
   * Tracks an event with optional properties.
   * @param event - Name of the event to track.
   * @param properties - Additional properties to associate with the event.
   */
  track(event: string, properties?: Record<string, unknown>): void {
    this.adapter.trackEvent(event, properties);
  }

  /**
   * Identifies a user with a unique ID and optional traits.
   * @param userId - Unique identifier for the user.
   * @param traits - Additional traits to associate with the user.
   */
  identify(userId: string, traits?: Record<string, unknown>): void {
    this.adapter.identifyUser(userId, traits);
  }

  /**
   * Tracks a page view with optional properties.
   * @param pageName - Name of the page.
   * @param properties - Additional properties to associate with the page view.
   */
  pageView(pageName: string, properties?: Record<string, unknown>): void {
    this.adapter.trackPageView(pageName, properties);
  }

  /**
   * Tracks a group or company associated with a user.
   * @param groupId - Unique identifier for the group or company.
   * @param traits - Additional traits to associate with the group.
   */
  group(groupId: string, traits?: Record<string, unknown>): void {
    this.adapter.trackGroup(groupId, traits);
  }

  /**
   * Alias a user ID, merging two identities.
   * Useful for associating anonymous and authenticated users.
   * @param newId - New identifier for the user.
   * @param previousId - Previous identifier to be merged.
   */
  alias(newId: string, previousId: string): void {
    this.adapter.aliasUser(newId, previousId);
  }

  /**
   * Flushes any pending analytics data.
   * Ensures all events are sent to the server.
   */
  flush(): Promise<void> {
    return this.adapter.flushEvents();
  }
}
