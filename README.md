<div align="center">
  <a href="">
    <img src="https://github.com/eternaljs/eternal/blob/main/media/cover%2Bicon.png" alt="Logo">
  </a>

<br />

<h1>Eternal: Make Your Dependencies Eternal</h1>
<h1>Simplify Integrations, Swap Providers Instantly, and Say Goodbye to Breaking Changes.<br />(In Construction)</h1>


Eternal is a modular framework that empowers developers to integrate third-party services effortlessly, switch providers without disruption, and ensure your app stays future-proof—no matter how the APIs or technologies evolve. It enables developers to interact with a single unified API and CLI tool, allowing for seamless upgrades, provider switching, and improved developer experience.

</div>

<h3 align="center">
<!--   <a href="https://eternaljs.com">Website</a>
  | <a href="https://docs.eternaljs.com">Docs</a> -->

<!--    | -->
  
  <a href="https://discord.gg/pTmBqXpw">Team Discord</a>
  | <a href="https://www.npmjs.com/org/eternal-js">NPM</a>
</h3>

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

Here's how to get started with Eternal:

1. **Initialize Your Project**  
   Use the Eternal CLI to create the required configuration file. If you haven't already, run the following command in your project directory:
   ```bash
   npx @eternal-js/cli init
   ```

2. **Open the Generated File**  
   The CLI will create a file named `eternal.ts` in your project directory. Open it to explore and customize the configuration as needed.

3. **Sample Configuration in `eternal.ts`**  
   The generated file will look something like this:
   ```typescript
   import { Eternal, AnalyticsModule, AuthModule } from '@eternal-js/core';
   import { MixPanelAdapter } from '@eternal-js/mixpanel-adapter';
   import { AuthJsAdapter } from '@eternal-js/auth-adapter';

   const eternal = new Eternal({
     analytics: new AnalyticsModule({
       adapter: new MixPanelAdapter({
         config: { apiKey: 'your-mixpanel-api-key' },
         extension: (mixpanel) => ({
           advancedUseCase1() {
             mixpanel.track('Custom Event', { data: 'example' });
           },
         }),
       }),
     }),
     auth: new AuthModule({
       adapter: new AuthJsAdapter({ apiKey: 'your-authjs-api-key' }),
     }),
   });

   export default {
     analytics: eternal.analytics,
     auth: eternal.auth,
   };
   ```

4. **Use the SDK in Your Project**  
   Now you can easily use Eternal modules in your application:
   ```typescript
   import { auth, analytics } from './eternal';

   // Track an analytics event
   analytics?.track('user_signup', { method: 'email' });

   // Authenticate a user
   auth?.signInWithEmailAndPassword('user@example.com', 'securePassword');
   ```

5. **Customize and Extend**  
   Edit the `eternal.ts` file to:
   - Add new modules (e.g., Database, Logger).
   - Switch adapters (e.g., from MixPanel to Google Analytics).
   - Extend modules for advanced use cases.

6. **Effortless Upgrades with Community Support**  
   Upgrading your dependencies to the latest APIs is now seamless with Eternal. Instead of rewriting code or struggling with breaking changes, Eternal ensures that your integrations stay compatible effortlessly.  

   The Eternal community continuously maintains and updates adapters whenever third-party providers release new APIs or make breaking changes. These updates are rigorously tested and made available to everyone.  

   To upgrade, simply run:  
   ```bash
   npx @eternal-js/cli upgrade
   ```  
   This command fetches the latest adapters and updates your configuration automatically, ensuring your code works smoothly with the newest versions.  

   With Eternal, you can stay focused on building your project while the community handles the heavy lifting of keeping your integrations future-proof. 🚀  

----

### **Supported Modules and Providers**

Browser Environment:

| Module         | Supported Providers                             |
|----------------|-----------------------------------------------------------|
| Analytics      | Google Analytics, Mixpanel, Segment                       |
| Auth           | Authjs, Supabase, FirebaseAuth, Auth0, Clerk, Stack-Auth  |
| Storage        | AWS S3, Google Cloud Storage, Azure Blob                  |
| Payments       | Stripe, PayPal, Square                                    |
| HTTP Clients   | `axios`, `node-fetch`, `superagent`, `request`            |                                                                                                                                                                    

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

Here's the updated README section with the command to create a new migration:

---

## **Contributing**

We welcome contributions from developers like you! Whether it’s improving Eternal, fixing bugs, or adding new migrations, every contribution makes a difference. Here's how you can get involved:


### **General Contribution Guidelines**

1. **Fork the Repository**: Start by forking the Eternal repository to your GitHub account.
2. **Create a New Branch**: Use a descriptive branch name, such as `feature/new-analytics-adapter` or `bugfix/auth-issue`.
3. **Make Your Changes**: Implement your changes while following the repository’s code style and structure.
4. **Commit Your Changes**: Use clear and concise commit messages, e.g., `Add support for XYZ feature`.
5. **Submit a Pull Request**: Open a pull request to the main repository with a detailed description of your changes.


### **How to Add a New Migration**

Eternal's upgrade process relies on migrations to handle API changes automatically. Follow these steps to create and contribute a new migration:

#### 1. **Generate a New Migration File**
Use the CLI to generate a migration template:
```bash
npx @eternal-js/cli contributor new-migration
```

- This will create a new migration file in the `migrations` directory with a timestamp-based filename (e.g., `migration-20231219-add-new-feature.ts`).
- The file includes placeholders and examples to help you define the migration logic.

#### 2. **Fill Out the Migration Template**
Open the generated file and complete the required sections:

- **Meta**:
  - Provide details like `id`, `description`, `createdAt`, and `author`.
  - Example: `author: "your-github-username"`.
- **Target Files**:
  - Define the files that should be included based on the project structure or framework.
- **Conditions**:
  - Specify validation logic to determine when the migration applies.
- **Transform**:
  - Write the transformation logic using Babel to update the source code. Use the `sourceCode`, `filePath`, and `context` parameters for precise transformations.

#### 3. **Test Your Migration**
Ensure your migration works as expected:
- Run the migration locally:
  ```bash
  npx @eternal-js/cli upgrade
  ```
- Confirm the migration updates the relevant files correctly and does not introduce errors.

#### 4. **Document the Migration**
Add comments in the migration file to explain:
- The purpose of the migration.
- The scenarios it addresses.
- Any important considerations or edge cases.

#### 5. **Submit Your Migration**
Once your migration is ready:
1. Commit your changes with a descriptive message, e.g., `Add migration to update AuthModule API to v2.0.0`.
2. Open a pull request with a detailed description of the migration logic and its use case.


### **Join the Community**
- **Discord**: Connect with other contributors and maintainers on our [Discord server](https://discord.gg/pTmBqXpw).
- **GitHub Issues**: Report bugs or suggest new features via [GitHub Issues](https://github.com/eternaljs/eternal/issues).

By contributing to Eternal, you're helping developers worldwide build better, future-proof integrations. Thank you for your support!

---
## **License**

This project is licensed under the  AGPL-3.0 License. See the `LICENSE` file for details.

---

## **Contact**

Have questions or feedback? Reach out to us:
- Email: contact@eternaljs.com
- GitHub Issues: [GitHub Issues](https://github.com/eternaljs/eternal/issues)

---

### **Future Plans**

- Add more providers for existing modules.
- Introduce new modules (e.g., Notifications, Logging).
- CLI tool for easier configuration and setup.
- SDK for mobile platforms (iOS and Android).

Stay tuned!

