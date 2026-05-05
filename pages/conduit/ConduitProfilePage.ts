import { type Page, type Locator, expect } from "@playwright/test";
import { slugifyTitle } from "../../helpers/stringConversion";
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
    await expect(this.articleItem(article.title).getByRole("heading", { level: 1 })).toHaveText(article.title);
    if (article.description) {
      await expect(this.articleItem(article.title).getByRole("paragraph")).toHaveText(article.description);
    }
    if (article.tags?.length) {
      const tags = await this.articleItem(article.title).locator("ul.tag-list").locator("li").allTextContents();

      expect(tags.map(t => t.trim())).toEqual(article.tags?.map(t => t.trim()));
    }
  }

  articleItem(articleTitle: string): Locator {
    return this.page.locator(`[href="/article/${slugifyTitle(articleTitle)}"]`);
  }
}
