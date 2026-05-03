# Playwright Testing Framework (TypeScript + POM + API + Integration)

A scalable end-to-end testing framework built with **Playwright + TypeScript**, designed to demonstrate modern QA practices including:

- Page Object Model (POM)
- Custom fixtures
- API testing
- UI + API integration testing
- Multi-project configuration
- CI-ready structure

---

## Purpose

This project evolved from basic UI tests into a **production-style QA framework**, focusing on:

- Clean test architecture and separation of concerns
- Reusable fixtures and test setup
- Combining API and UI for efficient test strategies
- Real-world scenarios using the Conduit (RealWorld) app

---

## Project Structure

```
.
├── api/
│   ├── ConduitApi.ts
│   └── PostsApi.ts
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── conduit/
│   │   └── ConduitLoginPage.ts
│   └── qa-playground/
│       ├── FormsPage.ts
│       └── InputFieldsPage.ts
├── tests/
│   ├── conduit/
│   │   ├── api/
│   │   │   └── conduit-auth.spec.ts
│   │   ├── integration/
│   │   │   └── conduit-login.spec.ts
│   │   └── ui/
│   ├── jsonplaceholder/
│   │   └── jsonplaceholder-posts.spec.ts
│   └── qa-playground/
│       ├── forms.spec.ts
│       ├── input-fields-advance.spec.ts
│       └── input-fields-beginner.spec.ts
├── .env.example
├── package.json
├── playwright.config.ts
└── README.md
```

---

## Test Layers

This project is intentionally structured in layers:

### 1. Fundamentals (UI-only): Playground
- Input fields
- Forms
- Focus on:
  - Locators
  - User interactions
  - Basic assertions

### 2. API Testing: JSONPlaceholder + Conduit
- Direct backend validation using HTTP requests
- Authentication and data setup

### 3. Integration (API + UI): Conduit
- Real-world scenarios
- API used for setup
- UI used for validation

---

## Testing Strategy

### UI Testing
- Page Object Model (POM)
- Centralized locators and reusable actions
- Fixtures inject page objects into tests

### API Testing
- Direct API validation using Playwright `request`
- Dedicated API layer (`ConduitApi`)
- Covers user registration and authentication

### Integration Testing (UI + API)
Pattern:
- Use API for setup
- Use UI for validation

Example:
- Create user via API
- Login via UI
- Verify authenticated state

---

## Fixtures

Custom fixtures provide:

- Page objects
- API clients

Example:

```ts
test.describe("Conduit login flow", () => {
  test("should login through UI an API-created user", async ({
    conduitApi,
    conduitLoginPage,
    page,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await expect(page.getByText(user.username)).toBeVisible();
  });
});
```

---

## Getting Started

```bash
git clone https://github.com/gabrielsarriavillada/playwright-training.git
cd playwright-training
npm ci
npm run install:browsers
```

> Requires Node.js 18+

---

## Running Tests

```bash
npm test                                  # run all tests
npm run test:headed                       # run with browser UI
npm run test:ui                           # Playwright UI mode
npm run test:debug                        # run on debug mode
npm run test:qa-playground-chromium       # run UI tests for qa-playground on chromium
npm run test:qa-playground-firefox        # run UI tests for qa-playground on firefox
npm run test:qa-playground-webkit         # run UI tests for qa-playground on webkit
npm run test:jsonplaceholder-api          # run API tests for jsonplaceholder
npm run test:conduit-api                  # run API tests for conduit
npm run test:conduit-integration-chromium # run integration tests for conduit on chromium
npm run test:smoke                        # run smoke test suite
```

---

## Test Report

After running tests:

```bash
npm run test:report
```

---

## Environment Variables

```
CONDUIT_API_BASE_URL=https://api.realworld.show/api
```

---

## Design Principles

- Tests focus on behavior, not implementation details
- No hardcoded URLs in tests or page objects
- Use fixtures for dependency injection of page objects and API clients
- Keep page objects simple and readable
- Use API clients for reusable request logic
- Separate UI and API concerns
- Keep configuration environment-driven
- Ensure tests are CI-ready

---

## Next Steps

- Add ConduitHomePage
- Add article creation tests (API + UI)
- Add negative scenarios
- Add tagging strategy (smoke/regression)
- Add AI-assisted QA examples

---

## Why this matters

Demonstrates real-world QA architecture and modern Playwright practices. The Conduit tests demonstrate a realistic testing approach where API requests create test data and the UI validates user-facing behavior.

---

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Custom fixtures
- API testing (`request`)
- Multi-project Playwright configuration
- GitHub Actions
- ESLint + Prettier
- dotenv
