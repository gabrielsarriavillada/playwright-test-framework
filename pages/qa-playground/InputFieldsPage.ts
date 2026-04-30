import type { Page, Locator } from "@playwright/test";

export class InputFieldsPage {
  readonly movieNameInput: Locator;
  readonly appendTextInput: Locator;
  readonly verifyTextInput: Locator;
  readonly clearTextInput: Locator;
  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;

  constructor(private page: Page) {
    this.movieNameInput = page.getByTestId("input-movie-name");
    this.appendTextInput = page.getByTestId("input-append-text");
    this.verifyTextInput = page.getByTestId("input-verify-text");
    this.clearTextInput = page.getByTestId("input-clear-text");
    this.disabledInput = page.getByTestId("input-disabled");
    this.readonlyInput = page.getByTestId("input-readonly");
  }

  async open() {
    await this.page.goto("/practice/input-fields");
  }

  async fillMovieName(movieName: string) {
    await this.movieNameInput.fill(movieName);
  }

  async focusAppendText() {
    await this.appendTextInput.focus();
  }

  async appendText(text: string) {
    await this.appendTextInput.click();
    await this.appendTextInput.press("End");
    await this.appendTextInput.pressSequentially(text);
  }

  async clearTextField() {
    await this.clearTextInput.fill("");
  }

  async tryToFillDisabledInput(value: string, timeout = 1000) {
    await this.disabledInput.fill(value, { timeout });
  }

  async tryToFillReadonlyInput(value: string) {
    await this.readonlyInput.fill(value, { force: true });
  }
  async tabToNextField() {
    await this.page.keyboard.press("Tab");
  }

  get movieNamePlaceholderShown() {
    return this.page.locator(
      '[data-testid="input-movie-name"]:placeholder-shown',
    );
  }
}
