import { test as base, expect } from "@playwright/test";
import { InputFieldsPage } from "../pages/qa-playground/InputFieldsPage";
import { FormsPage } from "../pages/qa-playground/FormsPage";
import { ConduitLoginPage } from "../pages/conduit/ConduitLoginPage";
import { ConduitApi } from "../api/ConduitApi";
import { ConduitHomePage } from "../pages/conduit/ConduitHomePage";

type Fixtures = {
  inputFieldsPage: InputFieldsPage;
  formsPage: FormsPage;
  conduitLoginPage: ConduitLoginPage;
  conduitHomePage: ConduitHomePage;
  conduitApi: ConduitApi;
};

export const test = base.extend<Fixtures>({
  inputFieldsPage: async ({ page }, use) => {
    await use(new InputFieldsPage(page));
  },
  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page));
  },
  conduitLoginPage: async ({ page }, use) => {
    await use(new ConduitLoginPage(page));
  },
  conduitHomePage: async ({ page }, use) => {
    await use(new ConduitHomePage(page));
  },
  conduitApi: async ({ request }, use) => {
    const apiBaseUrl =
      process.env.CONDUIT_API_BASE_URL ?? "https://api.realworld.show/api";
    await use(new ConduitApi(request, apiBaseUrl));
  },
});

export { expect };
