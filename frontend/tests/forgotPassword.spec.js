// forgotPassword.spec.js
import { expect, test } from "@playwright/test";

// Mock API URL
const MOCK_FORGOT_PASSWORD_API_URL = "**/api/v1/user/forgetPassword";

test.describe("ForgotPassword Component", () => {
  test("renders the forgot password form correctly", async ({ page }) => {
    await page.goto("/forgot-password"); // Replace with your forgot password page route

    // Assert that the form elements are rendered
    await expect(page.locator("text=Forgot Your Password?")).toBeVisible();
    await expect(page.locator('label[for="email"]')).toContainText(
      "Email Address:"
    );
    await expect(page.locator("input[type='email'][id='email']")).toBeVisible();
    await expect(page.locator("text=Send Reset Link")).toBeVisible();
  });

  test("successfully sends a password reset link", async ({ page }) => {
    // Mock the forgot password API response
    await page.route(MOCK_FORGOT_PASSWORD_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Password reset email sent successfully!",
        }),
      });
    });

    await page.goto("/forgot-password"); // Replace with your forgot password page route

    // Fill in the email input
    await page.fill("input[type='email'][id='email']", "test@example.com");

    // Click the "Send Reset Link" button
    await page.click("text=Send Reset Link");

    // Assert that the success message is displayed
    await expect(
      page.locator("text=Password reset email sent successfully!")
    ).toBeVisible({
      timeout: 5000,
    });

    // Assert that the email input is cleared
    await expect(page.locator("input[type='email'][id='email']")).toHaveValue(
      ""
    );
  });

  test("displays an error message for invalid email", async ({ page }) => {
    // Mock the forgot password API response (error case)
    await page.route(MOCK_FORGOT_PASSWORD_API_URL, async (route) => {
      await route.fulfill({
        status: 400, // Or any appropriate error status code
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "User with this email does not exist.",
        }),
      });
    });

    await page.goto("/forgot-password"); // Replace with your forgot password page route

    // Fill in the email input
    await page.fill("input[type='email'][id='email']", "invalid@example.com");

    // Click the "Send Reset Link" button
    await page.click("text=Send Reset Link");

    // Assert that the error message is displayed
    await expect(
      page.locator("text=User with this email does not exist.")
    ).toBeVisible({ timeout: 5000 });
  });

  test("displays a loading indicator while sending the request", async ({
    page,
  }) => {
    // Mock the forgot password API response (delay the response to simulate loading)
    await page.route(MOCK_FORGOT_PASSWORD_API_URL, async (route) => {
      await page.waitForTimeout(1000); // Simulate a delay of 1 second
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Password reset email sent successfully!",
        }),
      });
    });

    await page.goto("/forgot-password"); // Replace with your forgot password page route

    // Fill in the email input
    await page.fill("input[type='email'][id='email']", "test@example.com");

    // Click the "Send Reset Link" button
    const submitPromise = page.click("text=Send Reset Link"); // Start the click but don't await

    // Assert that the "Sending..." text is displayed (while loading)
    await expect(page.locator("text=Sending...")).toBeVisible();

    await submitPromise; // Await the click to complete

    // Assert that the success message is displayed after loading completes
    await expect(
      page.locator("text=Password reset email sent successfully!")
    ).toBeVisible({
      timeout: 5000,
    });
  });
});
