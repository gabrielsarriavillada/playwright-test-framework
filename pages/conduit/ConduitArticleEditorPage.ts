import type { Page, Locator } from "@playwright/test";

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
    await Promise.all([
      this.page.waitForURL(/\/article\//),
      this.publishArticleButton.click(),
    ]);
  }
}
