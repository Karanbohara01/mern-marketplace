import { expect, test } from "@playwright/test";

// Mock API URL for signup
const MOCK_SIGNUP_API_URL = "**/api/v1/user/register";

test.describe("Signup Component", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Navigating to Signup page...");
    await page.goto("/signup"); // Adjust if needed
  });

  test("renders the signup page correctly", async ({ page }) => {
    console.log("Checking page elements...");

    await expect(page.locator("text=Koselie")).toBeVisible();
    await expect(
      page.locator("text=Sign up to explore amazing content")
    ).toBeVisible();
    await expect(page.locator("text=Username")).toBeVisible();
    await expect(page.locator("text=Email")).toBeVisible();
    await expect(page.locator("text=Password")).toBeVisible();
    await expect(page.locator("text=Signup")).toBeVisible();
    await expect(
      page.locator("text=Already have an account? Login")
    ).toBeVisible();

    console.log("Signup page elements verified.");
  });

  test("displays validation errors when fields are empty", async ({ page }) => {
    console.log("Clicking signup button without entering data...");

    await page.click('button[type="submit"]');

    console.log("Checking for validation error message...");
    await expect(page.locator("text=All fields are required!")).toBeVisible();

    console.log("Validation error displayed correctly.");
  });

  test("allows user to enter credentials and submits the form", async ({
    page,
  }) => {
    console.log("Filling signup form...");

    await page.fill('input[name="username"]', "TestUser");
    await page.fill('input[name="email"]', "testuser@example.com");
    await page.fill('input[name="password"]', "Password123");

    console.log("Mocking successful signup API response...");

    await page.route(MOCK_SIGNUP_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Signup successful! Redirecting to login...",
        }),
      });
    });

    console.log("Submitting form...");
    await page.click('button[type="submit"]');

    console.log("Waiting for success message...");
    await expect(
      page.locator("text=Signup successful! Redirecting to login...")
    ).toBeVisible();

    console.log("Signup successful, redirecting...");
  });

  test("navigates to login page when clicking the 'Login' link", async ({
    page,
  }) => {
    console.log("Clicking 'Login' link...");

    await page.click("text=Login");

    console.log("Verifying navigation to login page...");
    await expect(page).toHaveURL("/login");

    console.log("Navigation to login page successful.");
  });
});
