import { sendSlackReport } from './slack-reporter';
import { getStartTime } from './global-setup';

const stateCounts = {
    passed: 0,
    failed: 0,
    skipped: 0,
};

export default async function globalTeardown() {
    const startTime = getStartTime();
    const duration = Date.now() - startTime;
    await sendSlackReport(stateCounts, duration);
}
