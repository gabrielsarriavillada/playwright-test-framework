import { expect, test } from "../../../fixtures/test.fixture";
import { generateArticleData } from "../../../helpers/conduit/articleFactory";
import { slugifyTitle } from "../../../helpers/stringConversion";

test.describe("Conduit articles", () => {
  test("should a new article through UI be created by an API-created user", async ({
    page,
    conduitApi,
    conduitArticleEditorPage,
    conduitHomePage,
    conduitLoginPage,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    const newArticle = generateArticleData();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await conduitHomePage.expectUserLoggedIn(user.username);

    await conduitArticleEditorPage.open();

    await conduitArticleEditorPage.fillArticle(newArticle);

    await conduitArticleEditorPage.publishArticle();

    await expect(page).toHaveURL(`${test.info().project.use.baseURL}/article/${slugifyTitle(newArticle.title)}`);
  });
});
