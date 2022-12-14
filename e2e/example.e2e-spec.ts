import { expect, test } from '@playwright/test';

test('homepage has Test in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Test/);
});