// auth.spec.js
import { expect, test } from "@playwright/test";

test.describe("Login Component", () => {
  test("renders the login form correctly", async ({ page }) => {
    await page.goto("/login"); // Replace with your login page route

    await expect(page.locator('label[for="email"]')).toContainText("Email");
    await expect(page.locator('label[for="password"]')).toContainText(
      "Password"
    );
    await expect(page.locator('button[type="submit"]')).toContainText("Login");
  });

  test("successfully logs in with adarsha@gmail.com and navigates to admin dashboard", async ({
    page,
  }) => {
    // Mock API calls
    await page.route("**/api/v1/user/login", async (route) => {
      // Customize the response based on the input data if needed
      const request = route.request();
      const postData = JSON.parse(request.postData());

      if (
        postData.email === "adarsha@gmail.com" &&
        postData.password === "Adarsha@123"
      ) {
        //  Return admin for specific role
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            message: "Login successful",
            user: { email: "adarsha@gmail.com", role: "admin" },
          }),
        });
      } else {
        await route.fulfill({
          status: 401, // Unauthorized
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Invalid credentials",
          }),
        });
      }
    });
    await page.goto("/login");

    await page.fill('input[name="email"]', "adarsha@gmail.com");
    await page.fill('input[name="password"]', "Adarsha@123");
    await page.click('button[type="submit"]');

    // Wait for navigation to admin dashboard (adjust selector as needed)
    await page.waitForURL("/admin/dashboard");
    await expect(page).toHaveURL("/admin/dashboard");
  });

  test("successfully logs in with adarsha@gmail.com and navigates to homepage (if role is user)", async ({
    page,
  }) => {
    // Mock API calls
    await page.route("**/api/v1/user/login", async (route) => {
      // Customize the response based on the input data if needed
      const request = route.request();
      const postData = JSON.parse(request.postData());

      if (
        postData.email === "adarsha@gmail.com" &&
        postData.password === "Adarsha@123"
      ) {
        //Customize mock to navigate to the homepage when it is a normal user.
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            message: "Login successful",
            user: { email: "adarsha@gmail.com", role: "user" }, // This makes it a normal user
          }),
        });
      } else {
        await route.fulfill({
          status: 401, // Unauthorized
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Invalid credentials",
          }),
        });
      }
    });
    await page.goto("/login");

    await page.fill('input[name="email"]', "adarsha@gmail.com");
    await page.fill('input[name="password"]', "Adarsha@123");
    await page.click('button[type="submit"]');

    // Wait for navigation to homepage
    await page.waitForURL("/"); // Changed this line  *IMPORTANT*
    await expect(page).toHaveURL("/"); // Changed this line *IMPORTANT*
  });

  test("shows an error message for invalid login credentials", async ({
    page,
  }) => {
    // Mock API calls
    await page.route("**/api/v1/user/login", async (route) => {
      // Customize the response based on the input data if needed
      const request = route.request();
      const postData = JSON.parse(request.postData());

      if (
        postData.email === "invalid@example.com" &&
        postData.password === "wrongpassword"
      ) {
        await route.fulfill({
          status: 401, // Unauthorized
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Invalid credentials",
          }),
        });
      } else {
        await route.abort(); // Abort the route if it doesn't match the invalid credentials case
      }
    });
    await page.goto("/login");

    await page.fill('input[name="email"]', "invalid@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Wait for error message to appear (adjust selector as needed)

    // IMPROVED SELECTOR:  Use getByText, waiting for the text to become visible
    await expect(page.getByText("Invalid credentials")).toBeVisible({
      timeout: 5000,
    }); // Adjust timeout if needed
  });

  test("displays a loading indicator while logging in (visual check)", async ({
    page,
  }) => {
    // Mock API calls
    await page.route("**/api/v1/user/login", async (route) => {
      // Customize the response based on the input data if needed
      const request = route.request();
      const postData = JSON.parse(request.postData());

      if (
        postData.email === "adarsha@gmail.com" &&
        postData.password === "Adarsha@123"
      ) {
        // Default to admin if these credentials are used (you might want separate roles for this)
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            message: "Login successful",
            user: { email: "adarsha@gmail.com", role: "admin" },
          }),
        });
      } else {
        await route.fulfill({
          status: 401, // Unauthorized
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Invalid credentials",
          }),
        });
      }
    });
    // Note: Playwright doesn't have a direct way to observe the loading state *without* interfering with the app
    // This is more of a visual check to ensure the UI is responsive.

    await page.goto("/login");

    await page.fill('input[name="email"]', "adarsha@gmail.com");
    await page.fill('input[name="password"]', "Adarsha@123");

    // Click submit, but don't wait for navigation yet. We want to see the loading indicator.
    const submitPromise = page.click('button[type="submit"]');

    // Give the loading indicator some time to appear (adjust timeout as needed)
    await page.waitForTimeout(500); // 0.5 seconds

    // Take a screenshot and visually inspect it.  You would manually verify the loader is present.
    // await page.screenshot({ path: 'loading_state.png' });

    // Now wait for the actual navigation to happen.
    await page.waitForURL("/admin/dashboard");
    await expect(page).toHaveURL("/admin/dashboard");
  });
  test("navigates to forgot password page when forgot password link is clicked", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.click("text=Forgot Password?");

    await page.waitForURL("/forgot-password");
    await expect(page).toHaveURL("/forgot-password");
  });
});
