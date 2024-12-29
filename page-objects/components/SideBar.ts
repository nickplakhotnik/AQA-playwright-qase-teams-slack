import {Page} from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

export class SideBar extends BaseComponent {
    private readonly dashboard = this.page.locator('[href="#"]:has(span:text("Dashboard"))');
    private readonly monitoring = this.page.locator('[href*="/monitoring"]');
    private readonly alerts = this.page.locator('[href*="/alerts"]');
    private readonly search = this.page.locator('[href*="/search"]');
    private readonly archive = this.page.locator('[href*="/archive"]');
    private readonly settings = this.page.locator('span:text("Settings")');
    private readonly settingsCameras = this.page.locator('[href*="/settings/cameras"]');
    private readonly settingsGateways = this.page.locator('[href="#"]:has(span:text("Gateways"))');
    private readonly settingsAlerts = this.page.locator('span:text("Alerts")');
    private readonly settingsAlertsRules = this.page.locator('[href*="/settings/alert-rules"]');
    private readonly settingsAlertsFaces = this.page.locator('[href*="/settings/face"]');
    private readonly settingsUsers = this.page.locator('[href*="/settings/users"]');
    private readonly settingsSites = this.page.locator('[href*="/settings/sites"]');
    private readonly settingsIntegrations = this.page.locator('[href="#"]:has(span:text("Integrations"))');

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
        return this.alerts;
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
        return this.settingsSites;
    }

    async getIntegrations() {
        return this.settingsIntegrations;
    }
}