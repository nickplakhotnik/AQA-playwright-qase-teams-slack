const { Upload } = require('@aws-sdk/lib-storage');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand, S3 } = require('@aws-sdk/client-s3');

const fs = require('fs');
const https = require('https');
const path = require('path');

// Vars
const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const slackHost = 'hooks.slack.com';
const slackUri = webhookUrl.replace(`https://${slackHost}`, '');
const buildId = process.env.CODEBUILD_BUILD_ID;
const service = buildId.split(':')[0];
const envr = process.env.ENV;
const targetChannel = '#automation-results';
const codebuildPrjUrl = 'https://us-east-1.console.aws.amazon.com/codesuite/codebuild/818196019823/projects';
const codebuildReportBucket =
  'https://us-east-1.console.aws.amazon.com/s3/object/qcue-artifacts?region=us-east-1&bucketType=general&prefix=apps%2Ftps-nextjs-automation%2Ftps-nextjs-automation-report.html';
const notificationSubj = `Build run: ${buildId}`;
const s3 = new S3();
const s3BucketName = 'qcue-artifacts';
const artifactKey = 'apps/tps-nextjs-automation/tps-nextjs-automation-report.html';
const htmlReportPath = '.tmp/testResults/cucumber-report.html';

const body = `\
App: ${service}
ENV: ${envr}
`;

const color = process.env.CODEBUILD_BUILD_SUCCEEDING === '1' ? '#04BA25' : '#D00000';

async function uploadToS3() {
  if (fs.existsSync(htmlReportPath)) {
    await new Upload({
      client: s3,

      params: {
        Bucket: s3BucketName,
        Key: artifactKey,
        Body: fs.createReadStream(htmlReportPath),
        ContentType: 'text/html',
      },
    }).done();

    const presignedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: s3BucketName,
        Key: artifactKey,
      }),
      {
        expiresIn: 86400,
      },
    );

    console.log(`Presigned URL: ${presignedUrl}`);
    return presignedUrl;
  } else {
    console.error('Report not found.');
    return 'Report not found.';
  }
}

function getTestResults() {
  try {
    const jsonReportPath = path.join(__dirname, '../.tmp/testResults/cucumber-report.json');
    const report = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    report.forEach((feature) => {
      feature.elements.forEach((scenario) => {
        let scenarioStatus = 'passed'; // Default to passed

        scenario.steps.forEach((step) => {
          if (step.result) {
            if (step.result.status === 'failed') {
              scenarioStatus = 'failed';
            } else if (step.result.status === 'skipped' && scenarioStatus !== 'failed') {
              scenarioStatus = 'skipped';
            }
          }
        });

        // Increment counts based on scenario status
        if (scenarioStatus === 'passed') passed++;
        else if (scenarioStatus === 'failed') failed++;
        else if (scenarioStatus === 'skipped') skipped++;
      });
    });

    return { passed, failed, skipped };
  } catch (error) {
    console.error('Error parsing Cucumber report:', error);
    return { passed: null, failed: null, skipped: null };
  }
}

function makePostRequest(host, endpoint, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: 443,
      path: endpoint,
      method: 'POST',
      headers,
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`Response Status: ${res.statusCode}`);
          console.log(`Response Data: ${responseData}`);
          resolve();
        } else {
          reject(new Error(`Slack notification FAILED. Code: ${res.statusCode}, Content error: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

(async () => {
  try {
    const presignedUrl = await uploadToS3();
    const testSummary = getTestResults();

    const payload = {
      channel: targetChannel,
      username: 'Automation TPS NextJs',
      icon_emoji: ':bellhop_bell:',
      attachments: [
        {
          fallback: 'AWS CodeBuild',
          text: service,
          pretext: 'AWS CodeBuild',
          color,
          title: notificationSubj,
          title_link: `${codebuildPrjUrl}/${service}/build/${buildId}/?region=us-east-1`,
          fields: [
            {
              title: 'Details:',
              value: body,
            },
            {
              title: 'Run Summary:',
              value: `✅ *Passed*: ${testSummary.passed}\n❌ *Failed*: ${testSummary.failed}\n⏭️ *Skipped*: ${testSummary.skipped}`,
            },
            {
              title: 'HTML Report (available for 1 hour):',
              value: `<${presignedUrl}|Click here to view the HTML report>`,
            },
            {
              title: 'Download Report here:',
              value: `<${codebuildReportBucket}|Access is here>`,
            },
          ],
        },
      ],
    };

    const headers = { 'Content-Type': 'application/json' };
    await makePostRequest(slackHost, slackUri, headers, payload);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
