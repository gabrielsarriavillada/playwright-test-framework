import { expect, test } from "../../../fixtures/test.fixture";
import { generateArticleData } from "../../../helpers/conduit/articleFactory";
import { slugifyTitle } from "../../../helpers/stringConversion";

test.describe.configure({ mode: "serial" });

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

    await expect(page).toHaveURL(
      `${test.info().project.use.baseURL}/article/${slugifyTitle(newArticle.title)}`,
    );
  });

  test("should the article details page of a new article be displayed correctly", async ({
    conduitApi,
    conduitArticleDetailsPage,
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

    await conduitArticleDetailsPage.validateArticleData(newArticle);
  });

  test("should display a newly created article in the user profile page", async ({
    conduitApi,
    conduitArticleEditorPage,
    conduitHomePage,
    conduitLoginPage,
    conduitProfilePage,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    const newArticle = generateArticleData();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await conduitHomePage.expectUserLoggedIn(user.username);

    await conduitArticleEditorPage.open();

    await conduitArticleEditorPage.fillArticle(newArticle);

    await conduitArticleEditorPage.publishArticle();

    await conduitProfilePage.open(user.username);

    await conduitProfilePage.expectArticlePresent(newArticle.title);

    await conduitProfilePage.validateArticleData(newArticle);
  });
});
