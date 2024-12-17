<div align="center">
  <a href="">
    <img src="https://github.com/dvir-daniel/eternal/blob/main/media/cover.png?a=a" alt="Logo">
  </a>

<br />

<h1>Eternal: Make Your Dependencies Eternal</h1>
<h1>One SDK to Simplify Integrations, Swap Providers Instantly, and Say Goodbye to Breaking Changes.<br />(In Construction)</h1>


Eternal is a modular framework that empowers developers to integrate third-party services effortlessly, switch providers without disruption, and ensure your app stays future-proof—no matter how the APIs or technologies evolve. It enables developers to interact with a single unified API, allowing for seamless upgrades, provider switching, and improved developer experience.

</div>

<br />

## Short Story - **The Developer’s Dilemma**

You’re deep in the zone, building a feature your team is excited to ship. Everything is on track until someone mentions the need for a third-party integration—analytics, payments, or authentication. “No problem,” you think, diving into the docs. By the end of the day, it’s working. But what feels like a small win is about to turn into a major headache.

### **When the Honeymoon Ends**
A few months later, cracks begin to show. The provider changes their API, and your integration breaks. Users are reporting bugs. The upgrade guide? It’s lengthy, confusing, and forces you to rewrite large parts of your codebase. Deadlines slip as you spend weeks untangling the mess.

Or maybe you decide to switch providers. That great deal on analytics doesn’t scale with your growing user base. But switching turns into a nightmare—ripping out the old SDK, rewriting your integration logic, and testing everything all over again.

What started as a quick integration has now cost you weeks—maybe months—of developer time, leaving your team frustrated and your progress stalled. But what if it didn’t have to be this way?

### **It Doesn’t Have to Be This Way**
This is why we built **Eternal**. It’s the SDK that helps you avoid these headaches altogether.

- **Seamless Provider Switching**: Outgrow one provider? Need better pricing? Switch to a new one with minimal changes to your code.
- **Effortless Upgrades**: Eternal handles breaking changes so you don’t have to. Your integrations stay compatible, and your app keeps running smoothly.
- **Future-Proof Scaling**: Whether you need one service or many, Eternal’s modular design lets you add or replace providers as your app grows—no rewrites required.

### **Focus on What Matters**
As developers, we want to spend our time building features, solving problems, and delivering value—not wrestling with third-party integrations. Eternal is here to make that possible. 

It’s not just about saving time or simplifying code. It’s about giving you the confidence that no matter what changes—a provider’s API, your app’s needs, or the market itself—your app will adapt and thrive.

With **Eternal**, the future of your app is in your hands, not your provider’s.

----

## **Getting Started**

### **Installation**

Step 1: Install Eternal using npm or yarn:

```bash
npm install eternal
# or
yarn add eternal
# or
pnpm add eternal
```

Step 2: To use specific providers (e.g., Google Analytics, FirebaseAuth, Stripe), install their adapters as well. 
Check the documentation for available adapters and installation commands.

<a href="">Click Here To Add Adapters</a>

### **Usage**

Here is an example of how to use Eternal:

#### **Initialize the SDK**

In your project directory, create a file named eternal.ts and add the following code:

```typescript
import { Eternal } from '@eternal/core';
import { GoogleAnalyticsAdapter } from '@eternal/google-analytics-adapter';
import { FirebaseAuthAdapter } from '@eternal/firebase-auth-adapter';

const eternal = new Eternal({
  analytics: new AnalyticsModule({
    adapter: new MixPanelAdapter({ apiKey: 'your-google-api-key' }),
  }),
  auth: new AuthModule({
    adapter: new AuthJsAdapter({ apiKey: 'your-firebase-api-key' }),
  }),
});

// Default export with custom named properties for easier imports
export default {
  analytics: eternal.analytics,
  auth: eternal.auth,
};

```

#### **Using the SDK**

```typescript
import { analytics, auth } from './eternal';

// Track an event
analytics?.track('user_signup', { method: 'email' });

// Authenticate a user
auth?.signInWithEmailAndPassword('user@example.com', 'securePassword');

Any many more..
```


### **Supported Modules and Providers**

Browser Environment:

| Module      | Supported Providers                         |
|-------------|---------------------------------------------|
| Analytics   | Google Analytics, Mixpanel, Segment         |
| Auth        | FirebaseAuth, Auth0, Okta                   |
| Storage     | AWS S3, Google Cloud Storage, Azure Blob    |
| Payments    | Stripe, PayPal, Square                      |
| HTTP Clients      | `axios`, `node-fetch`, `superagent`, `request`                                                                                                                                                                                         |

**Node.js Environment:**

| Module            | Supported Providers                                                                                                                                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Databases         | MySQL (`mysql`, `mysql2`), PostgreSQL (`pg`), MongoDB (`mongodb`), SQLite (`sqlite3`), Redis (`redis`), Sequelize (`sequelize`), Knex.js (`knex`)                                                                                     |
| Streams           | Apache Kafka (kafkajs, node-rdkafka), RabbitMQ (amqplib, rascal), Amazon Kinesis (aws-sdk), Apache Pulsar (pulsar-client) |
| Task Scheduling   | `node-cron`, `agenda`, `bull`, `node-schedule`                                                                                                                                                                                         |
| Logging           | `winston`, `bunyan`, `morgan`, `pino`                                                                                                                                                                                                  |

For more details on supported modules and usage, refer to the [Documentation](#).


---

## Frequently Asked Questions (FAQ)

### What about security and performance?
Eternal is designed to be lightweight and stateless. It acts as a thin abstraction layer over the SDKs you choose, meaning all security and performance considerations rely on the underlying SDK.

### Isn't it limiting to wrap all APIs? Won't I lose access to native SDK features?
Not at all! Eternal is designed to give you the best of both worlds. For common use cases, it provides a unified and consistent API, simplifying integration and protecting you from breaking changes. At the same time, if you need advanced or provider-specific features, you can directly access the native SDK alongside Eternal without any restrictions.

In fact, creating internal wrappers for third-party SDKs is a best practice followed by top tech companies. These wrappers ensure consistency, streamline integrations, and make it easier to swap providers or adapt to changes. Eternal brings this proven approach to everyone, so you can focus on building features rather than maintaining custom wrappers.

With Eternal, you benefit from:
- **A unified API for simplicity**: Handle common use cases with ease.
- **Full native SDK access for flexibility**: Use advanced features whenever needed.

It’s about having the power to adapt without the overhead of managing everything yourself. Eternal combines simplicity, flexibility, and scalability in one solution.

### Does Eternal support switching providers without rewriting code?
Yes! Eternal provides a unified API, making it easy to switch between providers by simply updating the adapter configuration. There’s no need to rewrite or restructure your code, saving time and effort.

### How does Eternal handle breaking changes in SDKs?
When a breaking change occurs in an SDK, Eternal updates the corresponding adapter. This means you only need to update Eternal and its adapter, while your codebase remains untouched.

### What happens if a feature isn’t supported by Eternal’s API?
Eternal focuses on covering the most common use cases across SDKs. If you need an advanced or specific feature of an SDK, you can still use the native SDK in parallel with Eternal. Alternatively, you can contribute to Eternal’s open-source adapters to include that feature.

### Does using Eternal add overhead?
Eternal is optimized to add minimal overhead. It’s a lightweight wrapper that focuses on providing consistency and simplicity while delegating the heavy lifting to the underlying SDKs.

### Can I add my own custom adapters?
Yes, Eternal is designed with extensibility in mind. You can create custom adapters to work with SDKs not currently supported by Eternal or tailor it to specific needs in your project.

### How does Eternal handle asynchronous operations?
Eternal seamlessly supports asynchronous operations by passing through the SDK’s promises or callbacks. Your application can handle these operations just as it would when directly using the SDK.

---

## **Contributing**

We welcome contributions! If you have ideas for improvements or new provider integrations, feel free to submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Submit a pull request.

---

## **License**

This project is licensed under the Apache 2.0 License. See the `LICENSE` file for details.

---

## **Contact**

Have questions or feedback? Reach out to us:
- Email: support@eternalsdk.com
- GitHub Issues: [GitHub Issues](https://github.com/dvir-daniel/eternal/issues)

---

### **Future Plans**

- Add more providers for existing modules.
- Introduce new modules (e.g., Notifications, Logging).
- CLI tool for easier configuration and setup.
- SDK for mobile platforms (iOS and Android).

Stay tuned!

