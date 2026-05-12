import { test, expect } from "../../fixtures/test.fixture";

let consoleErrors: string[];

test.beforeEach(async ({ page, formsPage }) => {
  consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const response = await formsPage.open();

  expect(response?.status()).toBe(200);
});

test("@smoke Fill all fields with valid data and submit successfully", async ({
  formsPage,
}) => {
  await formsPage.fillPersonalDetails({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    dob: "1990-05-21",
    gender: "male",
  });

  await formsPage.fillAddress({
    country: "India",
    city: "Mumbai",
  });

  await formsPage.fillAccountDetails("pass123");

  await formsPage.acceptTerms();

  await formsPage.submitForm();

  await expect(formsPage.formSuccessMessage).toBeVisible();
});

test("Verify required field errors appear on empty submit", async ({
  formsPage,
}) => {
  await formsPage.submitForm();

  await expect(formsPage.firstNameError).toHaveText("First name is required.");
  await expect(formsPage.lastNameError).toHaveText("Last name is required.");
  await expect(formsPage.emailError).toHaveText("Email is required.");
  await expect(formsPage.phoneError).toHaveText("Phone number is required.");
  await expect(formsPage.dobError).toHaveText("Date of birth is required.");
  await expect(formsPage.genderError).toHaveText("Please select a gender.");
  await expect(formsPage.countryError).toHaveText("Please select a country.");
  await expect(formsPage.cityError).toHaveText("City is required.");
  await expect(formsPage.passwordError).toHaveText("Password is required.");
  await expect(formsPage.confirmPasswordError).toHaveText(
    "Please confirm your password.",
  );
  await expect(formsPage.termsError).toHaveText("You must accept the terms.");
});

test("Verify invalid email format shows validation error", async ({
  formsPage,
}) => {
  await formsPage.fillEmail("notanemail");
  await formsPage.submitForm();

  await expect(formsPage.emailError).toHaveText("Enter a valid email address.");
});

test("Verify invalid phone number format shows error", async ({
  formsPage,
}) => {
  await formsPage.fillPhone("12345");
  await formsPage.submitForm();

  await expect(formsPage.phoneError).toHaveText(
    "Enter a valid 10-digit phone number.",
  );
});

test("Verify password minimum length validation", async ({ formsPage }) => {
  await formsPage.fillPassword("abc");
  await formsPage.submitForm();

  await expect(formsPage.passwordError).toHaveText(
    "Password must be at least 6 characters.",
  );
});

test("Verify password mismatch shows confirm password error", async ({
  formsPage,
}) => {
  await formsPage.fillAccountDetails("pass123", "pass456");
  await formsPage.submitForm();

  await expect(formsPage.confirmPasswordError).toHaveText(
    "Passwords do not match.",
  );
});

test("@smoke Verify T&C checkbox required error appears", async ({
  formsPage,
}) => {
  await formsPage.fillPersonalDetails({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    dob: "1990-05-21",
    gender: "male",
  });

  await formsPage.fillAddress({
    country: "India",
    city: "Mumbai",
  });

  await formsPage.fillAccountDetails("pass123");

  await formsPage.submitForm();

  await expect(formsPage.termsError).toHaveText("You must accept the terms.");
});

test("Verify success message displays submitted name", async ({
  formsPage,
}) => {
  const firstName = "Jane";
  const lastName = "Smith";

  await formsPage.fillPersonalDetails({
    firstName,
    lastName,
    email: "jame@example.com",
    phone: "9876543210",
    dob: "1990-05-21",
    gender: "female",
  });

  await formsPage.fillAddress({
    country: "India",
    city: "Mumbai",
  });

  await formsPage.fillAccountDetails("pass123");

  await formsPage.acceptTerms();

  await formsPage.submitForm();

  await expect(formsPage.formSuccessMessage).toBeVisible();
  await expect(formsPage.formSubmittedName).toContainText(
    `${firstName} ${lastName}`,
  );
});

test("Verify reset button clears all fields", async ({ formsPage }) => {
  await formsPage.fillFirstName("John");

  await formsPage.fillEmail("john@example.com");

  await formsPage.resetForm();

  await expect(formsPage.firstNameInput).toHaveValue("");
  await expect(formsPage.emailInput).toHaveValue("");
  await expect(formsPage.firstNameError).toBeHidden();
  await expect(formsPage.emailError).toBeHidden();
});

test("Verify gender radio button selection", async ({ formsPage }) => {
  await formsPage.selectGender("female");

  await expect(formsPage.genderFemaleRadio).toBeChecked();
  await expect(formsPage.genderMaleRadio).not.toBeChecked();
  await expect(formsPage.genderOtherRadio).not.toBeChecked();
});

test("Verify country dropdown selection", async ({ formsPage }) => {
  const country = "USA";

  await formsPage.selectCountry(country);

  await expect(formsPage.countryDropdown).toHaveText(country);
});

test("Verify multiple interest checkboxes can be selected", async ({
  formsPage,
}) => {
  await formsPage.checkSeleniumInterests();
  await formsPage.checkPlaywrightInterests();

  await expect(formsPage.seleniumCheckbox).toBeChecked();
  await expect(formsPage.playwrightCheckbox).toBeChecked();
  await expect(formsPage.cypressCheckbox).not.toBeChecked();
  await expect(formsPage.appiumCheckbox).not.toBeChecked();
  await expect(formsPage.jestCheckbox).not.toBeChecked();
});

test("Verify form fields retain values after validation failure", async ({
  formsPage,
}) => {
  const firstName = "John";
  const email = "john@example.com";

  await formsPage.fillFirstName(firstName);

  await formsPage.fillEmail(email);

  await formsPage.submitForm();

  await expect(formsPage.firstNameInput).toHaveValue(firstName);
  await expect(formsPage.emailInput).toHaveValue(email);
});

test("Verify Fill Again button returns to empty form from success state", async ({
  formsPage,
}) => {
  await formsPage.fillPersonalDetails({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    dob: "1990-05-21",
    gender: "male",
  });

  await formsPage.fillAddress({
    country: "India",
    city: "Mumbai",
  });

  await formsPage.fillAccountDetails("pass123");

  await formsPage.acceptTerms();

  await formsPage.submitForm();

  await formsPage.fillAgainForm();

  await expect(formsPage.registrationForm).toBeVisible();

  await expect(formsPage.firstNameInput).toHaveValue("");
  await expect(formsPage.lastNameInput).toHaveValue("");
  await expect(formsPage.emailInput).toHaveValue("");
  await expect(formsPage.phoneInput).toHaveValue("");
  await expect(formsPage.dobInput).toHaveValue("");
  await expect(formsPage.countryDropdown).toHaveText("Select country");
  await expect(formsPage.cityInput).toHaveValue("");
  await expect(formsPage.passwordInput).toHaveValue("");
  await expect(formsPage.confirmPasswordInput).toHaveValue("");
});

test("Verify form page loads without errors", async ({ formsPage }) => {
  expect(consoleErrors).toEqual([]);

  await expect(formsPage.registrationForm).toBeVisible();
  await expect(formsPage.submitFormButton).toBeVisible();
  await expect(formsPage.resetFormButton).toBeVisible();
});
