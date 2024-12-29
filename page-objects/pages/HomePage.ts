import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {ENDPOINT} from "../../constant/endpoint";
import {SideBar} from "../components/SideBar";

export class HomePage extends BasePage {
    readonly sideBar = new SideBar(this.page);

    constructor(page: Page) {
        super(page, ENDPOINT.homePage);
    }
}