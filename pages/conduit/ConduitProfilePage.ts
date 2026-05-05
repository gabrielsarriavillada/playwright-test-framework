import { type Page, type Locator, expect } from "@playwright/test";
import { ArticleData } from "../../helpers/conduit/articleFactory";

export class ConduitProfilePage {
  constructor(private page: Page) {}

  async open(username: string) {
    await this.page.goto(`/profile/${username}`);
  }

  async expectArticlePresent(articleTitle: string) {
    await expect(this.articleItem(articleTitle)).toBeVisible();
  }

  async validateArticleData(article: ArticleData) {
    const articleItem = this.articleItem(article.title);
    await expect(articleItem.getByRole("heading", { level: 1 })).toHaveText(
      article.title,
    );
    if (article.description) {
      await expect(articleItem.locator("p")).toHaveText(article.description);
    }
    if (article.tags?.length) {
      const tags = await articleItem
        .locator("ul.tag-list")
        .locator("li")
        .allTextContents();

      expect(tags.map((t) => t.trim())).toEqual(
        article.tags?.map((t) => t.trim()),
      );
    }
  }

  articleItem(articleTitle: string): Locator {
    return this.page
      .locator(".article-preview")
      .filter({ has: this.page.getByRole("link", { name: articleTitle }) });
  }
}
