import test from "../lib/BaseTest";
import {expect} from "playwright/test";

test.describe(`Login flow`, () => {
    test(`Verify successful login with valid data`, async ({loginPage}) => {
        await loginPage.open();
        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
    });

    [
        {
            login: 'test@gmail.com',
            password: 'SomePassword',
            message: 'Invalid credentials'
        },
        {
            login: 'test@gmail.com',
            password: '',
            message: 'Too short password'
        }
    ].forEach((data) => {
        test(`Verify with invalid data and error ${data.message} message should be visible`, async({loginPage}) => {
            await loginPage.open();
            await loginPage.login(data.login, data.password);
            await expect(await loginPage.getErrorMessage(data.message)).toBeVisible();
        })
    })
});
