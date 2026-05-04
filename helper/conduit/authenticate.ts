import { Page } from "@playwright/test";

export async function authenticateConduitUser(page: Page, token: string) {
  await page.goto("/");

  await page.evaluate((token) => {
    window.localStorage.setItem("jwtToken", token);
  }, token);

  await page.reload();
}
