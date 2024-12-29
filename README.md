## Project describe
- Playwright structure
- Integration with QA
- CI config
- Slack reporter
- Teams reporter 



## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

1. Clone the repository to your local machine:

```shell
https://github.com/nickplakhotnik/AQA-playwright-qase-teams-slack.git
```

2. Navigate to the project directory:

```shell
cd project
```

3. Install the dependencies:

```shell
npm install
```

4. Install Playwright:

```shell
npx playwright install
```

## Usage

1. Configure the test environment variables:

Update the .env file with your desired configurations, such as the URL of the test site, and any login credentials if required.

2. Run the tests:

- Run all tests in headless mode:

    ```shell
    npx playwright test
   ```

- Run a single test file

     ```shell
    npx playwright test AddToCart.spec.ts
   ```

- Run all tests in headful mode:

    ```shell
    npx playwright test --ui
    ```

This command will execute all the Playwright tests in headless mode.

3. View test reports:

Upon completion of the tests, a HTML test report will be generated in the /test-results directory. Open index.html in your preferred browser to view the test results.

