import { test } from "../../../fixtures/test.fixture";

test.describe("Conduit login flow", () => {
  test("should login through UI an API-created user", async ({
    conduitApi,
    conduitLoginPage,
    conduitHomePage,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await conduitHomePage.validateUserLoggedIn(user.username);
  });
});
