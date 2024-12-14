import { AuthAdapter } from "./auth-adapter";

export class AuthModule {
  private adapter: AuthAdapter;

  constructor(config: { adapter: AuthAdapter }) {
    this.adapter = config.adapter;
  }

  /**
   * Signs in a user with email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   */
  async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string> {
    return this.adapter.signInWithEmailAndPassword(email, password);
  }

  /**
   * Signs out the currently authenticated user.
   */
  async signOut(): Promise<void> {
    return this.adapter.signOut();
  }

  /**
   * Retrieves the currently authenticated user.
   */
  async getCurrentUser(): Promise<Record<string, unknown> | null> {
    return this.adapter.getCurrentUser();
  }

  /**
   * Signs in a user with a third-party provider (e.g., Google, Facebook).
   * @param provider - The name of the provider (e.g., "google", "facebook").
   */
  async signInWithProvider(provider: string): Promise<string> {
    return this.adapter.signInWithProvider(provider);
  }

  /**
   * Sends a password reset email to the user.
   * @param email - The user's email address.
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    return this.adapter.sendPasswordResetEmail(email);
  }
}
