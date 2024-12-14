<div align="center">
  <a href="">
    <img src="https://github.com/dvir-daniel/eternal/blob/main/media/cover.png" alt="Logo">
  </a>

<br />

<h1>One SDK to seamlessly integrate, switch providers, upgrade effortlessly without breaking changes, and scale third-party services.</h1>


Eternal is a powerful, modular framework designed to simplify integration with multiple third-party services, such as analytics, authentication, and more. It enables developers to interact with a single unified API, allowing for seamless upgrades, provider switching, and improved developer experience.

</div>

<br />

## **Features**

- **Unified API:** Interact with multiple services through one consistent API.
- **Provider Independence:** Easily switch between providers (e.g., Google Analytics, Mixpanel) with minimal code changes.
- **Modular Design:** Use only the modules you need (e.g., Analytics, Auth, Storage).
- **Dynamic Configuration:** Choose providers and configure them at runtime.
- **Failover Mechanism:** Fallback to secondary providers to ensure reliability.
- **Extensibility:** Add support for new providers without changing the core code.

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
- Email: support@eternal.com
- GitHub Issues: [GitHub Issues](https://github.com/your-repo/eternal/issues)

---

### **Future Plans**

- Add more providers for existing modules.
- Introduce new modules (e.g., Notifications, Logging).
- CLI tool for easier configuration and setup.
- SDK for mobile platforms (iOS and Android).

Stay tuned!

