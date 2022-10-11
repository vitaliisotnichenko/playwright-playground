import { expect, test } from '@playwright/test';
import { LoginPage } from "./pages/loginPage";
import { Constants } from "./src/lib/data/constants"
import { MainPage } from "./pages/mainPage";
import { ProductDetailsPage } from "./pages/productDetailsPage";

test.describe('Product form', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const constants = new Constants();
        await page.goto('/')
        await loginPage.loginToTheApp(constants.VALID_USER_EMAIl, constants.VALID_USER_PASSWORD)
    });

    test('is opened after double clicking on title value', async ({ page }) => {
        const mainPage = new MainPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        await mainPage.openProductForm(mainPage.titleField);
        await expect(productDetailsPage.overlay).toBeVisible();
    })

    test('allows to edit stock value', async ( { page } ) => {
        const mainPage = new MainPage(page);
        const constants = new Constants();
        await mainPage.openProductFieldToEdit(mainPage.stockField);
        const colorBorder = await mainPage.stockField.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('border-top-color');
        });
        await expect(colorBorder).toBe(constants.EDIT_FIELD_BORDER_COLOR)
    })

    test('allows to edit price value', async ( { page } ) => {
        const mainPage = new MainPage(page);
        const constants = new Constants();
        await mainPage.openProductFieldToEdit(mainPage.priceField);
        const colorBorder = await mainPage.priceField.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('border-top-color');
        });
        await expect(colorBorder).toBe(constants.EDIT_FIELD_BORDER_COLOR)
    })

    test('values are changed correctly', async ( { page } ) => {
        const mainPage = new MainPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const constants = new Constants();
        await mainPage.openProductForm(mainPage.titleField);
        await productDetailsPage.updateProductInformation(productDetailsPage.stockInput, constants.NEW_STOCK_VALUE);
        await expect(productDetailsPage.overlay).not.toBeVisible();
        await page.waitForSelector(`text=${constants.NEW_STOCK_VALUE}`, { timeout: 2000 })
        await expect(mainPage.stockValueFirstRow).toContainText(constants.NEW_STOCK_VALUE);
    })

    test('support sorting list by stock', async ( { page } ) => {
        const mainPage = new MainPage(page);
        await mainPage.clickInsideTheCell(mainPage.stockColumnHeader);
        await expect(mainPage.stockColumnAscendingSort).toBeVisible();
    })

})