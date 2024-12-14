export interface PaymentAdapter {
  /**
   * Processes a payment with the specified details.
   * @param amount - The amount to charge.
   * @param currency - The currency to use (e.g., "USD").
   * @param paymentDetails - Additional payment details like card info or token.
   * @returns A promise resolving to a transaction ID.
   */
  processPayment(
    amount: number,
    currency: string,
    paymentDetails: Record<string, unknown>,
  ): Promise<string>;

  /**
   * Refunds a payment by its transaction ID.
   * @param transactionId - The ID of the transaction to refund.
   * @param amount - Optional partial refund amount.
   * @returns A promise resolving to a refund ID.
   */
  refundPayment(transactionId: string, amount?: number): Promise<string>;

  /**
   * Creates a subscription for a customer.
   * @param customerId - The ID of the customer.
   * @param planId - The subscription plan ID.
   * @param metadata - Additional metadata for the subscription.
   * @returns A promise resolving to a subscription ID.
   */
  createSubscription(
    customerId: string,
    planId: string,
    metadata?: Record<string, unknown>,
  ): Promise<string>;

  /**
   * Cancels a subscription by its ID.
   * @param subscriptionId - The ID of the subscription to cancel.
   * @returns A promise resolving when the cancellation is complete.
   */
  cancelSubscription(subscriptionId: string): Promise<void>;

  /**
   * Retrieves details of a payment by its transaction ID.
   * @param transactionId - The ID of the transaction.
   * @returns A promise resolving to the payment details.
   */
  getPaymentDetails(transactionId: string): Promise<Record<string, unknown>>;
}
