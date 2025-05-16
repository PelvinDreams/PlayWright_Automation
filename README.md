# PlayWright Automation Project

This project uses [Playwright](https://playwright.dev/) for end-to-end browser automation and testing, written in TypeScript.

## Project Structure

- `src/` - Source code
  - `pom/` - Page Object Model classes (e.g., `LoginPage.ts`)
  - `tests/` - Test specifications (e.g., `emailTest.spec.ts`)
  - `utils/` - Utility functions (e.g., `emailHelper.ts`)
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `playwright-report/` - Playwright HTML reports
- `test-results/` - Test run artifacts (screenshots, videos, error context)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

2. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

### Running Tests

To run all tests:

```sh
npx playwright test
```

To run a specific test file:

```sh
npx playwright test src/tests/emailTest.spec.ts
```

### Viewing Reports

After running tests, view the HTML report:

```sh
npx playwright show-report
```

## Project Scripts

- `test` - Runs all Playwright tests
- `show-report` - Opens the Playwright HTML report

## Useful Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

Feel free to update this README with project-specific details as your test suite grows.
