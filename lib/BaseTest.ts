import {test as baseTest} from "@playwright/test";
import {LoginPage} from "../page-objects/pages/LoginPage";
import {HomePage} from "../page-objects/pages/HomePage";

const test = baseTest.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
});

export default test;