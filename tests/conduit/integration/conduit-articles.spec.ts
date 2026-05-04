import { expect, test } from "../../../fixtures/test.fixture";
import { generateArticleData } from "../../../helpers/conduit/articleFactory";
import { authenticateConduitUser } from "../../../helpers/conduit/authenticate";
import { slugifyTitle } from "../../../helpers/stringConversion";

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

    await expect(page).toHaveURL(`${test.info().project.use.baseURL}/article/${slugifyTitle(newArticle.title)}`);
  });
});
