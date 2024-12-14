import { EternalConfig } from ".";
import { AnalyticsModule } from "./modules/analytics/analytics-module";
import { AuthModule } from "./modules/auth/auth-module";
import { LogModule } from "./modules/log/log-module";
import { PaymentModule } from "./modules/payments/payment-module";

export default class Eternal {
  public auth?: AuthModule;
  public payments?: PaymentModule;
  public analytics?: AnalyticsModule;
  public log?: LogModule;

  constructor(config: EternalConfig) {
    if (config.auth) this.auth = config.auth;
    if (config.payments) this.payments = config.payments;
    if (config.analytics) this.analytics = config.analytics;
    if (config.log) this.log = config.log;
  }

  addModule<M extends keyof EternalConfig>(
    moduleName: M,
    moduleInstance: Required<EternalConfig>[M],
  ): void {
    if (moduleName in this) {
      (this as Record<string, unknown>)[moduleName] = moduleInstance;
    } else {
      throw new Error(`Module "${moduleName}" is not supported.`);
    }
  }
}
