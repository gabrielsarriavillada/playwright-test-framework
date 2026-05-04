import { type Page, type Locator, expect } from "@playwright/test";

export class ConduitArticleEditorPage {
  readonly articleTitleInput: Locator;
  readonly articleDescriptionInput: Locator;
  readonly articleBodyInput: Locator;
  readonly articleTagsInput: Locator;
  readonly publishArticleButton: Locator;

  constructor(private page: Page) {
    this.articleTitleInput = page.getByPlaceholder("Article Title");
    this.articleDescriptionInput = page.getByPlaceholder("What's this article about?");
    this.articleBodyInput = page.getByPlaceholder("Write your article (in markdown)");
    this.articleTagsInput = page.getByPlaceholder("Enter tags");
    this.publishArticleButton = page.getByRole("button", { name: "Publish Article" });
  }

  async open() {
    await this.page.goto("/editor");
  }

  async fillArticle(data: {
    title: string,
    description: string,
    body: string,
    tags: string,
  }) {
    await this.articleTitleInput.fill(data.title);
    await this.articleDescriptionInput.fill(data.description);
    await this.articleBodyInput.fill(data.body);
    await this.articleTagsInput.fill(data.tags);
  }

  async publishArticle() {
    const responsePromise = this.page.waitForResponse((response) => {
      const request = response.request();

      return (
        request.method() === "POST" &&
        response.url().includes("/api/articles") &&
        response.status() !== 301 &&
        response.status() !== 302 &&
        response.status() !== 303 &&
        response.status() !== 307 &&
        response.status() !== 308
      );
    });

    await this.publishArticleButton.click();

    const response = await responsePromise;

    if (!response.ok()) {
      let body: string;

      try {
        body = await response.text();
      } catch {
        body = "<response body unavailable>";
      }

      throw new Error(
        `Article creation failed: ${response.status()} ${body}`,
      );
    }

    await expect(this.page).toHaveURL(/\/article\//);
  }
}
