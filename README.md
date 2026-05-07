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
├── helpers/
│   ├── conduit/
│   │   ├── articleFactory.ts
│   │   └── authenticate.ts
│   └── stringConversion.ts
├── pages/
│   ├── conduit/
│   │   ├── ConduitArticleDetailsPage.ts
│   │   ├── ConduitArticleEditorPage.ts
│   │   ├── ConduitHomePage.ts
│   │   ├── ConduitLoginPage.ts
│   │   └── ConduitProfilePage.ts
│   └── qa-playground/
│       ├── FormsPage.ts
│       └── InputFieldsPage.ts
├── tests/
│   ├── conduit/
│   │   ├── api/
│   │   │   └── conduit-auth.spec.ts
│   │   ├── integration/
│   │   │   ├── conduit-articles.spec.ts
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

Example Scenario:

- Create user via API
- Login via UI
- Create article via UI
- Validate article details
- Validate article appears in user profile

```ts
test.describe("Conduit articles", () => {
  test("should display a newly created article in the user profile page", async ({
    conduitApi,
    conduitArticleEditorPage,
    conduitHomePage,
    conduitLoginPage,
    conduitProfilePage,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    const newArticle = generateArticleData();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await conduitHomePage.expectUserLoggedIn(user.username);

    await conduitArticleEditorPage.open();

    await conduitArticleEditorPage.fillArticle(newArticle);

    await conduitArticleEditorPage.publishArticle();

    await conduitProfilePage.open(user.username);

    await conduitProfilePage.expectArticlePresent(newArticle.title);

    await conduitProfilePage.validateArticleData(newArticle);
  });
});
```

> Note: API is used for user setup only. Article creation is performed via UI to ensure full end-to-end validation of user workflows.

---

## Parallel Execution Strategy

This framework is designed to support parallel execution using Playwright workers.

- UI and API tests are fully parallelized and isolated (unique users and data per test).
- Integration tests against the Conduit demo application are executed in serial mode.

### Why are some tests serial?

The Conduit application (https://demo.realworld.show) is a shared public demo environment. Under parallel load, it can exhibit:

- Intermittent network failures (Unable to connect)
- Inconsistent API responses (missing or delayed responses)
- Redirect behavior during POST requests
- Race conditions between write (POST) and read (GET) operations

These behaviors are characteristic of shared public environments under concurrent load, rather than issues in the test architecture itself.

### Decision

To balance execution speed with reliability:

- Parallel execution is used wherever the system under test is stable
- Conduit integration scenarios are marked as:

```ts
test.describe.configure({ mode: "serial" }); // see comment in spec
```

### Notes for real-world projects

In production environments, this limitation would typically be addressed by:

- Using isolated test environments (per test run or per branch)
- Controlling backend state (fixtures, seeding, teardown)
- Avoiding shared public APIs for critical test flows

These tests were intentionally executed in parallel during development to validate system behavior under concurrency and identify environment limitations.

---

## Fixtures

Custom fixtures provide:

- Page objects
- API clients
- Centralized dependency injection to keep tests clean and readable

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

## AI-Assisted QA Feature

This project includes an experimental AI-powered bug report generator.

It converts Playwright failure output into structured bug reports including:

- summary
- steps to reproduce
- expected result
- actual result
- evidence
- possible root cause
- severity suggestion

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

- Expand business-critical scenarios (profile validation, feed validation)
- Introduce risk-based test selection (smoke vs regression strategy)
- Integrate AI-assisted workflows for:
  - Failure analysis
  - Bug report generation
  - Test case generation

---

## Why this matters

This project demonstrates how to design a scalable QA automation framework that balances speed, reliability, and maintainability.

Key focus areas:

- Using API-driven setup to reduce UI dependency and execution time
- Validating real user behavior through UI interactions
- Structuring tests to reflect business-critical workflows
- Building a framework that is maintainable and CI-ready
- Demonstrates how to balance test reliability with execution speed using hybrid API/UI strategies

The Conduit integration tests showcase a realistic QA approach where test data is created programmatically and validated through the user interface.

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
