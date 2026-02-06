import test, { expect } from "../src/test/e2e/util/test";

test.describe("Pricing Page", () => {
  test("loads successfully", async ({ pricingPage }) => {
    await pricingPage.goto();
    const heading = pricingPage.getHeading();
    await expect(heading).toBeVisible();
  });

  test("displays free tier", async ({ pricingPage }) => {
    await pricingPage.goto();
    // Free tier is hardcoded, always visible
    await expect(pricingPage.page.getByText("Free")).toBeVisible();
  });

  test("displays FAQ section", async ({ pricingPage }) => {
    await pricingPage.goto();
    const faq = pricingPage.getFAQSection();
    await expect(faq).toBeVisible();
  });
});
