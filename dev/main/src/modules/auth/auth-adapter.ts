export interface AuthAdapter {
  /**
   * Signs in a user with email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A promise resolving to the user ID or token.
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<string>;

  /**
   * Signs out the currently authenticated user.
   * @returns A promise resolving when the user is signed out.
   */
  signOut(): Promise<void>;

  /**
   * Retrieves the currently authenticated user.
   * @returns A promise resolving to the user object or null if no user is authenticated.
   */
  getCurrentUser(): Promise<Record<string, unknown> | null>;

  /**
   * Signs in a user with a third-party provider.
   * @param provider - The name of the provider (e.g., "google", "facebook").
   * @returns A promise resolving to the user ID or token.
   */
  signInWithProvider(provider: string): Promise<string>;

  /**
   * Sends a password reset email to the user.
   * @param email - The user's email address.
   * @returns A promise resolving when the email is sent.
   */
  sendPasswordResetEmail(email: string): Promise<void>;
}
