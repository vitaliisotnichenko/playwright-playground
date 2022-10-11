import { Locator, Page } from '@playwright/test';
import {BasePage} from "../src/helpers/basePage";

export class ProductDetailsPage extends BasePage {
    readonly overlay: Locator;
    readonly stockInput: Locator
    readonly titleInput: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.overlay = page.locator('.cdk-overlay-pane');
        this.stockInput = page.locator('[formcontrolname="stock"]');
        this.titleInput = page.locator('[formcontrolname="title"]');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async updateProductInformation(productFieldLocator: Locator, productFieldValue: string) {
        await productFieldLocator.fill(productFieldValue);
        await this.submitButton.click();
    }

    async getFieldInputValue(productFieldLocator: Locator) {
        return await productFieldLocator.textContent();
    }

}