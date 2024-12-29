import type { MsTeamsReporterOptions } from "playwright-msteams-reporter";
import { qaseTestRunLink } from "./playwright.config";

/**
 * Initialize MS Teams Reporter
 * https://www.npmjs.com/package/playwright-msteams-reporter
 */
const msTeamsReporter = <MsTeamsReporterOptions>{
    webhookUrl: `${process.env.POWER_WEBHOOK}`,
    webhookType: 'powerautomate', // or 'msteams' if using the incoming webhook
    linkToResultsUrl: qaseTestRunLink || '',
    linkToResultsText: 'View Qase Test Results',
    notifyOnSuccess: true,
    enableEmoji: true,
  };

export default {
  testDir: "./tests",
  reporter: [
    ['playwright-msteams-reporter', msTeamsReporter],
    ['html', { open: 'never' }], 
  ],
};