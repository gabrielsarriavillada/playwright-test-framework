import type { Page, Locator } from "@playwright/test";

type Gender = "male" | "female" | "other";

export class FormsPage {
  // Form field locators
  readonly registrationForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly dobInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly genderOtherRadio: Locator;
  readonly countryDropdown: Locator;
  readonly cityInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly seleniumCheckbox: Locator;
  readonly playwrightCheckbox: Locator;
  readonly cypressCheckbox: Locator;
  readonly appiumCheckbox: Locator;
  readonly jestCheckbox: Locator;
  readonly termsCheckbox: Locator;
  readonly submitFormButton: Locator;
  readonly resetFormButton: Locator;

  // Form success locators
  readonly formSuccessMessage: Locator;
  readonly formSubmittedName: Locator;
  readonly fillAgainButton: Locator;

  // Error field locators
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly phoneError: Locator;
  readonly dobError: Locator;
  readonly genderError: Locator;
  readonly countryError: Locator;
  readonly cityError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly termsError: Locator;

  constructor(private page: Page) {
    this.registrationForm = page.getByTestId("user-registration-form");
    this.firstNameInput = page.getByTestId("input-first-name");
    this.lastNameInput = page.getByTestId("input-last-name");
    this.emailInput = page.getByTestId("input-email");
    this.phoneInput = page.getByTestId("input-phone");
    this.dobInput = page.getByTestId("input-dob");
    this.genderMaleRadio = page.getByTestId("radio-gender-male");
    this.genderFemaleRadio = page.getByTestId("radio-gender-female");
    this.genderOtherRadio = page.getByTestId("radio-gender-other");
    this.countryDropdown = page.getByTestId("select-country");
    this.cityInput = page.getByTestId("input-city");
    this.passwordInput = page.getByTestId("input-password");
    this.confirmPasswordInput = page.getByTestId("input-confirm-password");
    this.seleniumCheckbox = page.getByTestId("checkbox-interest-selenium");
    this.playwrightCheckbox = page.getByTestId("checkbox-interest-playwright");
    this.cypressCheckbox = page.getByTestId("checkbox-interest-cypress");
    this.appiumCheckbox = page.getByTestId("checkbox-interest-appium");
    this.jestCheckbox = page.getByTestId("checkbox-interest-jest");
    this.termsCheckbox = page.getByTestId("checkbox-terms");
    this.submitFormButton = page.getByTestId("submit-form-btn");
    this.resetFormButton = page.getByTestId("reset-form-btn");
    this.formSuccessMessage = page.getByTestId("form-success-msg");
    this.formSubmittedName = page.getByTestId("submitted-name");
    this.fillAgainButton = page.getByTestId("reset-form-btn");
    this.firstNameError = page.getByTestId("error-first-name");
    this.lastNameError = page.getByTestId("error-last-name");
    this.emailError = page.getByTestId("error-email");
    this.phoneError = page.getByTestId("error-phone");
    this.dobError = page.getByTestId("error-dob");
    this.genderError = page.getByTestId("error-gender");
    this.countryError = page.getByTestId("error-country");
    this.cityError = page.getByTestId("error-city");
    this.passwordError = page.getByTestId("error-password");
    this.confirmPasswordError = page.getByTestId("error-confirm-password");
    this.termsError = page.getByTestId("error-terms");
  }

  async open() {
    return await this.page.goto("/practice/forms");
  }

  async fillPersonalDetails(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: Gender;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.dobInput.fill(data.dob);

    const genderRadio = {
      male: this.genderMaleRadio,
      female: this.genderFemaleRadio,
      other: this.genderOtherRadio,
    }[data.gender];
    await genderRadio.check();
  }

  async fillAddress(data: { country: string; city: string }) {
    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: data.country }).click();
    await this.cityInput.fill(data.city);
  }

  async fillAccountDetails(password: string, confirmPassword?: string) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(
      confirmPassword ? confirmPassword : password,
    );
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async selectGender(gender: Gender) {
    const genderRadio = {
      male: this.genderMaleRadio,
      female: this.genderFemaleRadio,
      other: this.genderOtherRadio,
    }[gender];
    await genderRadio.check();
  }

  async selectCountry(country: string) {
    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: country }).click();
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async checkSeleniumInterests() {
    await this.seleniumCheckbox.check();
  }

  async checkPlaywrightInterests() {
    await this.playwrightCheckbox.check();
  }

  async checkCypressInterests() {
    await this.cypressCheckbox.check();
  }

  async checkAppiumInterests() {
    await this.appiumCheckbox.check();
  }

  async checkJestInterests() {
    await this.jestCheckbox.check();
  }

  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  async submitForm() {
    await this.submitFormButton.click();
  }

  async resetForm() {
    await this.resetFormButton.click();
  }

  async fillAgainForm() {
    await this.fillAgainButton.click();
  }
}
