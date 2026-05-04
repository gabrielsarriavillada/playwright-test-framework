import { Page } from "@playwright/test";

export async function authenticateConduitUser(page: Page, token: string) {
    await page.addInitScript((token) => {
        window.localStorage.setItem("jwtToken", token);
    }, token);
}
