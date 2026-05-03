import { expect, type Page, type Locator } from "@playwright/test";

export class ConduitHomePage {
  readonly newArticleLink: Locator;

  constructor(private page: Page) {
    this.newArticleLink = page.getByRole("link", { name: "New Article" });
  }

  async open() {
    await this.page.goto("/");
  }

  profileLink(username: string): Locator {
    return this.page.getByRole("link", { name: username });
  }

  async clickUserProfile(username: string) {
    await this.profileLink(username).click();
  }

  async expectUserLoggedIn(username: string) {
    await expect(this.profileLink(username)).toBeVisible();
  }
}
