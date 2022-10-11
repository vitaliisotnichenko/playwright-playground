import { expect, Locator, Page } from '@playwright/test';
import {BasePage} from "../src/helpers/basePage";

export class LoginPage extends BasePage {
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator
    readonly logoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailField = page.locator('[data-test-id="loginEmail"]');
        this.passwordField = page.locator('[data-test-id="loginPassword"]');
        this.submitButton = page.locator('[data-test-id="submitButton"]');
        this.logoutButton = page.locator('[data-test-id="logoutButton"]')
    }

    async loginToTheApp(email: string, password: string) {
        await this.emailField.type(email);
        await this.passwordField.type(password);
        await this.submitButton.click();
        await expect(this.emailField).not.toBeVisible();
    }
}