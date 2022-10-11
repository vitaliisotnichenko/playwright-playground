import { Locator, Page } from '@playwright/test';
import {BasePage} from "../src/helpers/basePage";

export class MainPage extends BasePage {
    readonly titleField: Locator;
    readonly brandField: Locator;
    readonly descriptionField: Locator
    readonly stockField: Locator
    readonly priceField: Locator
    readonly stockValueFirstRow: Locator
    readonly stockColumnHeader: Locator
    readonly stockColumnAscendingSort: Locator

    constructor(page: Page) {
        super(page)
        this.titleField = page.locator('.ag-center-cols-container :nth-child(1) div[col-id="title"]');
        this.brandField = page.locator('.ag-center-cols-container :nth-child(1) div[col-id="brand"]');
        this.descriptionField = page.locator('.ag-center-cols-container :nth-child(1) div[col-id="description"]');
        this.stockField = page.locator('.ag-center-cols-container :nth-child(1) div[col-id="stock"]');
        this.priceField = page.locator('.ag-center-cols-container :nth-child(1) div[col-id="price"]');
        this.stockValueFirstRow = page.locator('.ag-center-cols-container .ag-row-first [col-id="stock"]');
        this.stockColumnHeader = page.locator('.ag-header [col-id="stock"]');
        this.stockColumnAscendingSort = page.locator('.ag-header [col-id="stock"][aria-sort="ascending"]');
    }

    async openProductForm(field: Locator) {
        await field.dblclick();
    }

    async openProductFieldToEdit(field: Locator) {
        await field.dblclick();
    }

    async getFieldInputValue(productFieldLocator: Locator) {
       return await productFieldLocator.textContent();
    }

    async clickInsideTheCell(cell: Locator) {
        await cell.click();
    }
}