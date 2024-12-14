import { AnalyticsModule } from "./modules/analytics/analytics-module";
import { AuthModule } from "./modules/auth/auth-module";
import { LogModule } from "./modules/log/log-module";
import { PaymentModule } from "./modules/payments/payment-module";

export interface EternalConfig {
  auth?: AuthModule;
  payments?: PaymentModule;
  analytics?: AnalyticsModule;
  log?: LogModule;
}
