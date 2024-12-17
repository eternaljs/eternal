import { PaymentAdapter } from "./payments-adapter";

export class PaymentModule {
  private adapter: PaymentAdapter;

  constructor(config: { adapter: PaymentAdapter }) {
    this.adapter = config.adapter;
  }

  /**
   * Processes a payment with the specified details.
   * @param amount - The amount to charge.
   * @param currency - The currency to use (e.g., "USD").
   * @param paymentDetails - Additional payment details like card info or token.
   */
  async processPayment(
    amount: number,
    currency: string,
    paymentDetails: Record<string, unknown>,
  ): Promise<string> {
    return this.adapter.processPayment(amount, currency, paymentDetails);
  }

  /**
   * Refunds a payment by its transaction ID.
   * @param transactionId - The ID of the transaction to refund.
   * @param amount - Optional partial refund amount.
   */
  async refundPayment(transactionId: string, amount?: number): Promise<string> {
    return this.adapter.refundPayment(transactionId, amount);
  }

  /**
   * Creates a subscription for a customer.
   * @param customerId - The ID of the customer.
   * @param planId - The subscription plan ID.
   * @param metadata - Additional metadata for the subscription.
   */
  async createSubscription(
    customerId: string,
    planId: string,
    metadata?: Record<string, unknown>,
  ): Promise<string> {
    return this.adapter.createSubscription(customerId, planId, metadata);
  }

  /**
   * Cancels a subscription by its ID.
   * @param subscriptionId - The ID of the subscription to cancel.
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    return this.adapter.cancelSubscription(subscriptionId);
  }

  /**
   * Retrieves details of a payment by its transaction ID.
   * @param transactionId - The ID of the transaction.
   */
  async getPaymentDetails(
    transactionId: string,
  ): Promise<Record<string, unknown>> {
    return this.adapter.getPaymentDetails(transactionId);
  }
}
