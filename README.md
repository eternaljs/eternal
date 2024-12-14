<div align="center">
  <a href="">
    <img src="https://github.com/dvir-daniel/eternal/blob/main/media/cover.png" alt="Logo">
  </a>

<br />

<h1>One SDK to seamlessly integrate, switch providers, upgrade effortlessly without breaking changes, and expand third-party capabilities <br />(In Construction)</h1>


Eternal is a powerful, modular framework designed to simplify integration with multiple third-party services, such as analytics, authentication, and more. It enables developers to interact with a single unified API, allowing for seamless upgrades, provider switching, and improved developer experience.

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

```typescript
import { Eternal } from 'eternal';
import { GoogleAnalyticsAdapter } from '@eternal/google-analytics-adapter';
import { FirebaseAuthAdapter } from '@eternal/firebase-auth-adapter';

const sdk = new Eternal({
  analytics: new AnalyticsModule({
    adapter: new GoogleAnalyticsAdapter({ apiKey: 'your-google-api-key' }),
  }),
  auth: new AuthModule({
    adapter: new FirebaseAuthAdapter({ apiKey: 'your-firebase-api-key' }),
  }),
});
```

#### **Using the SDK**

```typescript
//Track Events with the Analytics Module
sdk.analytics?.track('user_signup', { method: 'email' });

Or
//Authenticate Users with the Auth Module
sdk.auth?.signInWithEmailAndPassword('user@example.com', 'securePassword');

Any many more..
```


### **Supported Modules and Providers**

| Module      | Supported Providers                         |
|-------------|---------------------------------------------|
| Analytics   | Google Analytics, Mixpanel, Segment         |
| Auth        | FirebaseAuth, Auth0, Okta                   |
| Storage     | AWS S3, Google Cloud Storage, Azure Blob    |
| Payments    | Stripe, PayPal, Square                      |

For more details on supported modules and usage, refer to the [Documentation](#).


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

