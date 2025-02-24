// // VerifyEmail.spec.js
// import { expect, test } from "@playwright/test";

// // Mock API URL
// const MOCK_VERIFY_EMAIL_API_URL = "**/api/v1/user/verify/**";

// test.describe("VerifyEmail Component", () => {
//   test("renders the verifying message correctly while loading", async ({
//     page,
//   }) => {
//     await page.goto("/verify/some_token"); // Replace with a route that renders VerifyEmail
//     await expect(page.locator("text=Verifying...")).toBeVisible();
//   });

//   test("displays success message and login link on successful verification", async ({
//     page,
//   }) => {
//     // Mock the successful verification API response
//     await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify({
//           success: true,
//           message: "Email verified successfully!",
//         }),
//       });
//     });

//     await page.goto("/verify/token"); // Replace with a route that renders VerifyEmail

//     // Assert that the success message is displayed
//     await expect(page.locator("text=Email verified successfully!")).toBeVisible(
//       { timeout: 5000 }
//     );

//     // Assert that the "Go to Login" link is displayed
//     await expect(page.locator("text=Go to Login")).toBeVisible();
//   });

//   test("displays error message on failed verification", async ({ page }) => {
//     // Mock the failed verification API response
//     await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
//       await route.fulfill({
//         status: 400, // Or any appropriate error status code
//         contentType: "application/json",
//         body: JSON.stringify({
//           success: false,
//           message: "Invalid verification token.",
//         }),
//       });
//     });

//     await page.goto("/verify/invalid_token"); // Replace with a route that renders VerifyEmail

//     // Assert that the error message is displayed
//     await expect(page.locator("text=Invalid verification token.")).toBeVisible({
//       timeout: 5000,
//     });

//     // Assert that the "Go to Login" link is NOT displayed (since verification failed)
//     await expect(page.locator("text=Go to Login")).not.toBeVisible();
//   });

//   test("navigates to login page when clicking the 'Go to Login' link", async ({
//     page,
//   }) => {
//     // Mock the successful verification API response (required for rendering the link)
//     await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify({
//           success: true,
//           message: "Email verified successfully!",
//         }),
//       });
//     });

//     await page.goto("/verify/valid_token"); // Replace with a route that renders VerifyEmail

//     // Click the "Go to Login" link
//     await page.click("text=Go to Login");

//     // Assert that the page navigates to the login page
//     await expect(page).toHaveURL("/login"); // Replace with your login page route
//   });
// });

import { expect, test } from "@playwright/test";

// Mock API URL
const MOCK_VERIFY_EMAIL_API_URL = "**/api/v1/user/verify/**";

test.describe("VerifyEmail Component", () => {
  test("renders the verifying message correctly while loading", async ({
    page,
  }) => {
    console.log("Navigating to email verification page...");
    await page.goto("/verify/some_token");

    console.log("Ensuring page is fully loaded...");
    await page.waitForLoadState("domcontentloaded"); // Ensures the DOM is fully loaded

    console.log("Waiting for 'Verifying...' message...");
    await page.locator("text=Verifying...").waitFor({ timeout: 10000 });

    console.log("Asserting 'Verifying...' message is visible...");
    await expect(page.locator("text=Verifying...")).toBeVisible();
  });

  test("displays success message and login link on successful verification", async ({
    page,
  }) => {
    console.log("Mocking successful email verification...");
    await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Artificial delay
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Email verified successfully!",
        }),
      });
    });

    console.log("Navigating to verification page...");
    await page.goto("/verify/token");

    console.log("Waiting for success message...");
    await page.waitForSelector(".message-box", { timeout: 10000 });

    console.log("Asserting success message is visible...");
    await expect(page.locator(".message-box")).toContainText(
      "Email verified successfully!"
    );

    console.log("Asserting 'Go to Login' link is visible...");
    await expect(page.locator("text=Go to Login")).toBeVisible();
  });

  test("displays error message on failed verification", async ({ page }) => {
    console.log("Mocking failed email verification...");
    await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Artificial delay
      await route.fulfill({
        status: 400, // Or any appropriate error status code
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Invalid verification token.",
        }),
      });
    });

    console.log("Navigating to invalid verification page...");
    await page.goto("/verify/invalid_token");

    console.log("Waiting for error message...");
    await page.waitForSelector(".message-box", { timeout: 10000 });

    console.log("Asserting error message is visible...");
    await expect(page.locator(".message-box")).toContainText(
      "Invalid verification token."
    );

    console.log("Ensuring 'Go to Login' link is NOT visible...");
    await expect(page.locator("text=Go to Login")).not.toBeVisible();
  });

  test("navigates to login page when clicking the 'Go to Login' link", async ({
    page,
  }) => {
    console.log("Mocking successful email verification...");
    await page.route(MOCK_VERIFY_EMAIL_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Email verified successfully!",
        }),
      });
    });

    console.log("Navigating to valid verification page...");
    await page.goto("/verify/valid_token");

    console.log("Waiting for 'Go to Login' link...");
    await page.waitForSelector("text=Go to Login");

    console.log("Clicking 'Go to Login' link...");
    await page.click("text=Go to Login");

    console.log("Asserting navigation to login page...");
    await expect(page).toHaveURL("/login");
  });
});
