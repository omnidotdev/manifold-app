import test, { expect } from "../src/test/e2e/util/test";

test.describe("Authentication", () => {
  test("shows sign in button when unauthenticated", async ({ homePage }) => {
    await homePage.goto();
    const signInButton = homePage.getSignInButton();
    await expect(signInButton).toBeVisible();
  });

  test("sign in button is clickable", async ({ homePage }) => {
    await homePage.goto();
    const signInButton = homePage.getSignInButton();
    await expect(signInButton).toBeEnabled();
  });
});
