import { test, expect } from "@playwright/test";

test("Verify successful movie name input", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await page.getByTestId("input-movie-name").fill("Die hard");
  await expect(page.getByTestId("input-movie-name")).toHaveValue("Die hard");
});

test("Verify input placeholder disappears on typing", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-movie-name")).toHaveAttribute(
    "placeholder",
    "Enter hollywood movie name",
  );
  await expect(
    page.locator("[data-testid=input-movie-name]:placeholder-shown"),
  ).toBeVisible();
  await page.getByTestId("input-movie-name").fill("Die hard");
  await expect(
    page.locator("[data-testid=input-movie-name]:placeholder-shown"),
  ).toBeHidden();
});

test("Verify keyboard tab triggers focus change after append", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await page.getByTestId("input-append-text").focus();
  await expect(page.getByTestId("input-append-text")).toBeFocused();
  await expect(page.getByTestId("input-append-text")).toHaveValue("I am good");
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("input-verify-text")).toBeFocused();
});

test("Verify appended text value is retained in the field", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-append-text")).toHaveValue("I am good");
  await page.getByTestId("input-append-text").click();
  await page.getByTestId("input-append-text").press("End");
  await page
    .getByTestId("input-append-text")
    .pressSequentially(" appended text");
  await expect(page.getByTestId("input-append-text")).toHaveValue(
    "I am good appended text",
  );
});

test("Verify text present inside field matches expected value", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-verify-text")).toHaveValue(
    "QA PlayGround",
  );
});

test("Verify getAttribute return the correct input value", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-verify-text")).toHaveAttribute(
    "value",
    "QA PlayGround",
  );
});

test("Verify input field text can be cleared successfully", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-clear-text")).toHaveValue(
    "QA PlayGround Clear Me",
  );
  await page.getByTestId("input-clear-text").fill("");
  await expect(page.getByTestId("input-clear-text")).toBeEmpty();
});

test("Verify field is empty after executing clear action", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-clear-text")).toHaveValue(
    "QA PlayGround Clear Me",
  );
  await page.getByTestId("input-clear-text").fill("");
  await expect(page.getByTestId("input-clear-text")).toHaveValue("");
});

test("Verify disabled input field cannot be edited by user", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-disabled")).toHaveAttribute("disabled");
  await expect(
    page
      .getByTestId("input-disabled")
      .fill("Trying to type", { timeout: 1000 }),
  ).rejects.toThrow();
});

test("Verify isEnabled() return false for disabled input", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-disabled")).toBeDisabled();
});

test("Verify readonly input field does not accept user typing", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await page
    .getByTestId("input-readonly")
    .fill("Trying to type", { force: true });
  await expect(page.getByTestId("input-readonly")).toHaveValue(
    "This text is readonly",
  );
});

test("Verify getAttribute returns correct readonly attribute value", async ({
  page,
}) => {
  await page.goto("https://www.qaplayground.com/practice/input-fields");
  await expect(page.getByTestId("input-readonly")).toHaveAttribute("readonly");
});
