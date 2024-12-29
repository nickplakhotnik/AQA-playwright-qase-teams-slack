import {BrowserContext, Page} from "@playwright/test";
import playwrightConfig from "../../playwright.config";

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async open() {
        await this.page.goto(playwrightConfig.use.baseURL.concat(this.url));
    }

    async waitNetworkKidLoadState() {
        await this.page.waitForLoadState('networkidle');
    }

    async waitForDomContentLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForLoadState() {
        await this.page.waitForLoadState(`load`);
    }

    async reloadPage() {
        await this.page.reload();
        await this.waitForDomContentLoad();
    }
}
