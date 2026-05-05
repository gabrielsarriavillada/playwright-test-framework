import { test as base, expect } from "@playwright/test";
import { InputFieldsPage } from "../pages/qa-playground/InputFieldsPage";
import { FormsPage } from "../pages/qa-playground/FormsPage";
import { ConduitLoginPage } from "../pages/conduit/ConduitLoginPage";
import { ConduitApi } from "../api/ConduitApi";
import { ConduitHomePage } from "../pages/conduit/ConduitHomePage";
import { ConduitArticleEditorPage } from "../pages/conduit/ConduitArticleEditorPage";
import { ConduitArticleDetailsPage } from "../pages/conduit/ConduitArticleDetailsPage";

type Fixtures = {
  inputFieldsPage: InputFieldsPage;
  formsPage: FormsPage;
  conduitArticleEditorPage: ConduitArticleEditorPage;
  conduitArticleDetailsPage: ConduitArticleDetailsPage;
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
  conduitArticleEditorPage: async ({ page }, use) => {
    await use(new ConduitArticleEditorPage(page));
  },
  conduitArticleDetailsPage: async ({ page }, use) => {
    await use(new ConduitArticleDetailsPage(page));
  },
  conduitApi: async ({ request }, use) => {
    const apiBaseUrl =
      process.env.CONDUIT_API_BASE_URL ?? "https://api.realworld.show/api";
    await use(new ConduitApi(request, apiBaseUrl));
  },
});

export { expect };
