import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {ENDPOINT} from "../../constant/endpoint";
import test from "../../lib/BaseTest";

export class LoginPage extends BasePage {
    private readonly emailInput = this.page.locator('#email');
    private readonly passwordInput = this.page.locator('#password');
    private readonly signInButton = this.page.locator('button:has-text("Sign In")');

    constructor(page: Page) {
        super(page, ENDPOINT.login);
    }

    private async fillEmail(email: string) {
        await this.emailInput.waitFor({state: "visible"});
        await this.emailInput.clear();
        await this.emailInput.fill(email);
    }

    private async fillPassword(password: string) {
        await this.passwordInput.waitFor({state: "visible"});
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    private async clickOnSignIn() {
        await this.signInButton.hover();
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await test.step('Login with email and password', async () => {
            await this.fillEmail(email);
            await this.fillPassword(password);
            await this.clickOnSignIn();
        })
    }

    async getErrorMessage(text: string) {
        return this.page.locator(`.text-red-600:has-text("${text}")`);
    }
}