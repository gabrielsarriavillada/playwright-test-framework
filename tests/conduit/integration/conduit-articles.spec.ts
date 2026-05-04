import { expect, test } from "../../../fixtures/test.fixture";
import { authenticateConduitUser } from "../../../helper/authenticate";

test.describe("Conduit articles", () => {
  test("should a new article through UI be created by an API-created user", async ({
    page,
    conduitApi,
    conduitArticleEditorPage,
  }) => {
    const { token } = await conduitApi.createUserAndGetToken();

    await authenticateConduitUser(page, token);

    await conduitArticleEditorPage.open();

    await conduitArticleEditorPage.fillArticle({
      "title": "Test article",
      "description": "Test description",
      "body": "Test body",
      "tags": "tag0",
    });

    await conduitArticleEditorPage.publishArticle();

    await expect(page).toHaveURL(`${test.info().project.use.baseURL}/article/test-article`);
  });
});
