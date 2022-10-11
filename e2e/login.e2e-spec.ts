import { expect, test } from '@playwright/test';
import { LoginPage } from "./pages/loginPage";
import { Constants } from "./src/lib/data/constants"


test.describe('Login to app', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    });

    test('with correct credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const constants = new Constants();
        await loginPage.loginToTheApp(constants.VALID_USER_EMAIl, constants.VALID_USER_PASSWORD)
        await expect(loginPage.logoutButton).toHaveText('Logout');
    })
})