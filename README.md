<div align="center">
  <a href="">
    <img src="https://github.com/dvir-daniel/eternal/blob/main/media/cover.png" alt="Logo">
  </a>

<br />

<h1>One SDK to seamlessly integrate, switch providers, upgrade effortlessly without breaking changes, and expand third-party capabilities <br />(In Construction)</h1>


Eternal is a powerful, modular framework designed to simplify integration with multiple third-party services, such as analytics, authentication, and more. It enables developers to interact with a single unified API, allowing for seamless upgrades, provider switching, and improved developer experience.

</div>

<br />

## **The Developer’s Dilemma**

Imagine this: You’re working on a feature for your app. It’s going to be game-changing—users will love it, and your team can’t wait to ship it. But before you get too far, the team realizes you need to integrate a new third-party service. Maybe it’s for analytics, payments, or authentication. No big deal, right?

At first, everything goes smoothly. You read the docs, install the SDK, and implement the API. It works. Your feature is live, and everyone’s happy.

Until you aren’t.

---

### **When the Honeymoon Ends**
A few months later, cracks begin to show. The provider changes their API, and your integration breaks. Users are reporting bugs. The upgrade guide? It’s lengthy, confusing, and requires rewriting large parts of your codebase. Deadlines slip as you spend weeks untangling the mess.

Or maybe you decide to switch providers. That great deal you got on analytics isn’t so great anymore, or the service doesn’t scale with your growing user base. But switching turns out to be more complicated than you thought. You have to rip out the old SDK, rewrite your integration logic, and test everything all over again.

What started as a simple decision to rely on third-party services has now cost you weeks—maybe months—of developer time. 

---

### **It Doesn’t Have to Be This Way**
This is why we built **Eternal**. It’s the SDK that helps you avoid these headaches altogether.

- **Seamless Provider Switching**: Outgrow one provider? Need better pricing? Switch to a new one with minimal changes to your code.
- **Effortless Upgrades**: Eternal handles breaking changes so you don’t have to. Your integrations stay compatible, and your app keeps running smoothly.
- **Future-Proof Scaling**: Whether you need one service or many, Eternal’s modular design lets you add or replace providers as your app grows—no rewrites required.

---

### **Focus on What Matters**
As developers, we want to spend our time building features, solving problems, and delivering value—not wrestling with third-party integrations. Eternal is here to make that possible. 

It’s not just about saving time or simplifying code. It’s about giving you the confidence that no matter what changes—a provider’s API, your app’s needs, or the market itself—your app will adapt and thrive.

With **Eternal**, the future of your app is in your hands, not your provider’s.


---



## **Getting Started**

### **Installation**

Install Eternal using npm or yarn:

```bash
npm install eternal
# or
yarn add eternal
# or
pnpm add eternal
```

---

### **Usage**

Here is a step-by-step guide on how to use Eternal:

#### **1. Initialize the SDK**

```typescript
import { Eternal } from 'eternal';

// Define your configuration
const sdk = new Eternal({
  analytics: new AnalyticsModule({
    adapter: new GoogleAnalyticsAdapter({ apiKey: 'your-google-api-key' }),
  }),
  auth: new AuthModule({
    adapter: new FirebaseAuthAdapter({ apiKey: 'your-firebase-api-key' }),
  }),
});
```

#### **2. Track Events with Analytics**

```typescript
sdk.analytics?.track('user_signup', { method: 'email' });
```

#### **3. Authenticate Users**

```typescript
sdk.auth?.signInWithEmailAndPassword('user@example.com', 'securePassword');
```

#### **4. Switch Providers**

Switching providers is simple and requires minimal changes to your configuration.

```typescript
sdk.analytics?.updateAdapter(
  new MixpanelAdapter({ apiKey: 'your-mixpanel-api-key' })
);
```

#### **5. Add or Update Modules Dynamically**

You can add or update modules after initializing the SDK.

```typescript
sdk.addModule(
  'payments',
  new PaymentModule({
    adapter: new StripeAdapter({ apiKey: 'your-stripe-api-key' }),
  })
);
```

---

### **Configuration**

Eternal uses a flexible configuration object to define the modules and their respective adapters:

```typescript
const config = {
  analytics: new AnalyticsModule({
    adapter: new GoogleAnalyticsAdapter({ apiKey: 'your-google-api-key' }),
  }),
  auth: new AuthModule({
    adapter: new FirebaseAuthAdapter({ apiKey: 'your-firebase-api-key' }),
  }),
};

const sdk = new Eternal(config);
```

---

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

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**

Have questions or feedback? Reach out to us:
- Email: support@eternalsdk.com
- GitHub Issues: [GitHub Issues](https://github.com/your-repo/eternal/issues)

---

### **Future Plans**

- Add more providers for existing modules.
- Introduce new modules (e.g., Notifications, Logging).
- CLI tool for easier configuration and setup.
- SDK for mobile platforms (iOS and Android).

Stay tuned!

