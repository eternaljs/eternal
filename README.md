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
```

---

### **Usage**

Here is an example of how to use Eternal:

#### **Initialize the SDK**

```typescript
import { Eternal } from 'eternal';

const sdk = new Eternal({
  analytics: { provider: 'GoogleAnalytics', apiKey: 'your-google-api-key' },
  auth: { provider: 'FirebaseAuth', apiKey: 'your-firebase-api-key' },
});
```

#### **Use the Analytics Module**

```typescript
sdk.analytics.track('user_signup', { method: 'email' });
```

#### **Use the Auth Module**

```typescript
sdk.auth.signInWithEmailAndPassword('user@example.com', 'securePassword');
```

#### **Switch Providers Dynamically**

```typescript
sdk.config.updateProvider('analytics', 'Mixpanel', { apiKey: 'your-mixpanel-api-key' });
```

---

## **Modules**

### **Analytics Module**
- Track user events and behavior.
- Supported providers: Google Analytics, Mixpanel, Segment.

#### Example
```typescript
sdk.analytics.track('page_view', { page: '/home' });
```

### **Auth Module**
- Manage user authentication.
- Supported providers: FirebaseAuth, Auth0, Okta.

#### Example
```typescript
sdk.auth.signInWithEmailAndPassword('user@example.com', 'password123');
sdk.auth.signOut();
```

---

## **Configuration**

Eternal uses a configuration object to define providers and their respective credentials:

```typescript
const config = {
  analytics: { provider: 'GoogleAnalytics', apiKey: 'your-google-api-key' },
  auth: { provider: 'FirebaseAuth', apiKey: 'your-firebase-api-key' },
};

const sdk = new Eternal(config);
```

### **Updating Configuration**

Update providers or settings dynamically:

```typescript
sdk.config.updateProvider('auth', 'Auth0', { clientId: 'your-auth0-client-id', domain: 'your-auth0-domain' });
```

---

## **Supported Providers**

| Module      | Supported Providers                         |
|-------------|---------------------------------------------|
| Analytics   | Google Analytics, Mixpanel, Segment         |
| Auth        | FirebaseAuth, Auth0, Okta                   |
| Storage     | AWS S3, Google Cloud Storage, Azure Blob    |
| Payments    | Stripe, PayPal, Square                      |

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

