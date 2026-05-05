import { type Page, type Locator, expect } from "@playwright/test";
import { slugifyTitle } from "../../helpers/stringConversion";
import { ArticleData } from "../../helpers/conduit/articleFactory";

export class ConduitArticleDetailsPage {
  readonly articleTitle: Locator;
  readonly articleContent: Locator;
  readonly articleTagList: Locator;

  constructor(private page: Page) {
    this.articleTitle = page.getByRole("heading", { level: 1});
    this.articleContent = page.locator(".article-content");
    this.articleTagList = this.articleContent.locator(".tag-list");
  }

  async open(articleTitle: string) {
    await this.page.goto(`/article/${slugifyTitle(articleTitle)}`);
  }

  async validateArticleData(article: ArticleData) {
    await expect(this.articleTitle).toHaveText(article.title);
    if (article.body) {
      await expect(this.articleContent).toContainText(article.body);
    }
    if (article.tags?.length) {
      const tags = await this.articleTagList.locator("li").allTextContents();

      expect(tags.map(t => t.trim())).toEqual(article.tags?.map(t => t.trim()));
    }
  }
}
