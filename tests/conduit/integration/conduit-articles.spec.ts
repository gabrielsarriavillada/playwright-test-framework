import { expect, test } from "../../../fixtures/test.fixture";
import { generateArticleData } from "../../../helper/conduit/articleFactory";
import { authenticateConduitUser } from "../../../helper/conduit/authenticate";

test.describe("Conduit articles", () => {
  test("should a new article through UI be created by an API-created user", async ({
    page,
    conduitApi,
    conduitArticleEditorPage,
  }) => {
    const { token } = await conduitApi.createUserAndGetToken();

    const newArticle = generateArticleData();

    await authenticateConduitUser(page, token);

    await conduitArticleEditorPage.open();

    await conduitArticleEditorPage.fillArticle(newArticle);

    await conduitArticleEditorPage.publishArticle();

    await expect(page).toHaveURL(`${test.info().project.use.baseURL}/article/${newArticle.title.toLocaleLowerCase().replaceAll(" ", "-")}`);
  });
});
