import { KnownBlock } from '@slack/web-api';
import dotenv from "dotenv";

dotenv.config();

const SLACK_CHANNEL = process.env.SLACK_CHANNEL;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

const EMOJI_SYMBOLS = {
    PASSED: ':white_check_mark:',
    FAILED: ':x:',
    SKIPPED: ':warning:',
    FINISHED: ':checkered_flag:',
    STOPWATCH: ':stopwatch:',
};

const FINISHED_COLOR = '#87d7fd';

const getCounts = (stateCounts: { passed: number; failed: number; skipped: number }, duration: number) => {
    return `*${EMOJI_SYMBOLS.PASSED} Passed: ${stateCounts.passed} | ${EMOJI_SYMBOLS.FAILED} Failed: ${stateCounts.failed} | ${EMOJI_SYMBOLS.SKIPPED} Skipped: ${stateCounts.skipped} | Total time: ${(duration / 1000).toFixed(2)}s*`;
};

export const sendSlackReport = async (stateCounts: { passed: number; failed: number; skipped: number }, duration: number) => {
    const blocks: Array<KnownBlock> = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: `${EMOJI_SYMBOLS.FINISHED} Test Run Complete - ${EMOJI_SYMBOLS.STOPWATCH} ${(duration / 1000).toFixed(2)}s`,
                emoji: true,
            },
        },
        {
            type: 'context',
            elements: [
                { type: 'mrkdwn', text: `Environment: ${process.env.NODE_ENV || 'development'}` },
            ],
        },
    ];

    if (stateCounts.failed > 0) {
        blocks.push({
            type: 'divider',
        });
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:alert: <!channel> Tests failed: ${stateCounts.failed}`,
            },
        });
    }

    const payload = {
        channel: SLACK_CHANNEL,
        text: getCounts(stateCounts, duration),
        blocks,
    };

    try {
        const response = await fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Failed to send Slack message:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending Slack message:', error);
    }
};
