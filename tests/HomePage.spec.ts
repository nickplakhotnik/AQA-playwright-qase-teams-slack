import test from "../lib/BaseTest";
import {expect} from "playwright/test";

test.describe(`Home page`, () => {
    test(`Verify sidebar with elements are visible`, async ({loginPage, homePage}) => {
        await loginPage.open();
        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
        await expect(await homePage.sideBar.getDashboard()).toBeVisible();
        await expect(await homePage.sideBar.getMonitoring()).toBeVisible();
        await expect(await homePage.sideBar.getAlerts()).toBeVisible();
        await expect(await homePage.sideBar.getSearch()).toBeVisible();
        await expect(await homePage.sideBar.getArchive()).toBeVisible();
        await expect(await homePage.sideBar.getSettings()).toBeVisible();
        await expect(await homePage.sideBar.getCameras()).toBeVisible();
        await expect(await homePage.sideBar.getGateways()).toBeVisible();
        await expect(await homePage.sideBar.getSettingsAlerts()).toBeVisible();
        await expect(await homePage.sideBar.getRules()).toBeVisible();
        await expect(await homePage.sideBar.getFaces()).toBeVisible();
        await expect(await homePage.sideBar.getUsers()).toBeVisible();
        await expect(await homePage.sideBar.getSites()).toBeVisible();
        await expect(await homePage.sideBar.getIntegrations()).toBeVisible();
    });
});
