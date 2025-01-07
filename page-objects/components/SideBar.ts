import {Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

export class SideBar extends BaseComponent {
    private readonly dashboard = this.page.locator('//*[text()="Dashboard"]');
    private readonly monitoring = this.page.locator('//*[text()="Monitoring"]');
    private readonly alerts = this.page.locator('//*[text()="Alerts"]');
    private readonly search = this.page.locator('//*[text()="Search"]');
    private readonly archive = this.page.locator('//*[text()="Archive"]');
    private readonly settings = this.page.locator('//*[text()="Settings"]');
    private readonly settingsCameras = this.page.locator('//*[text()="Cameras"]');
    private readonly settingsGateways = this.page.locator('//*[text()="Gateways"]');
    private readonly settingsAlerts = this.page.locator('//*[contains(@class, "MuiCollapse-entered")]//*[text()="Alerts"]');
    private readonly settingsAlertsRules = this.page.locator('//*[text()="Rules"]');
    private readonly settingsAlertsFaces = this.page.locator('//*[text()="Faces"]');
    private readonly settingsUsers = this.page.locator('//*[text()="Users"]');
    private readonly settingsSites = this.page.locator('//*[text()="Sites"]');
    private readonly settingsIntegrations = this.page.locator('//*[text()="Integrations"]');

    constructor(page: Page) {
        super(page);
    }

    async getDashboard() {
        return this.dashboard;
    }

    async getMonitoring() {
        return this.monitoring;
    }

    async getAlerts() {
        return this.alerts.first();
    }

    async getSearch() {
        return this.search;
    }

    async getArchive() {
        return this.archive;
    }

    async getSettings() {
        return this.settings;
    }

    async getCameras() {
        return this.settingsCameras;
    }

    async getGateways() {
        return this.settingsGateways
    }

    async getSettingsAlerts() {
        return this.settingsAlerts;
    }

    async getRules() {
        return this.settingsAlertsRules;
    }

    async getFaces() {
        return this.settingsAlertsFaces
    }

    async getUsers() {
        return this.settingsUsers;
    }

    async getSites() {
        return this.settingsSites.first();
    }

    async getIntegrations() {
        return this.settingsIntegrations;
    }

    async clickOnSettings() {
        await this.settings.hover();
        await this.settings.click();
    }

    async clickOnSettingsAlert() {
        await this.settingsAlerts.hover();
        await this.settingsAlerts.click();
    }
}