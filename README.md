# playwrightAMEX

A Playwright-based automation project for testing framework

## Project Structure

- `pages/` - Page Object Model classes for different AMEX pages
  - `goldCardPage.ts`
  - `homePage.ts`
  - `personalCardsPage.ts`
- `tests/` - Playwright test specs
  - `amex.spec.ts`
- `utils/` - Utility functions
  - `createUser.ts`
- `playwright.config.ts` - Playwright configuration
- `playwright-report/` - Test reports
- `test-results/` - Raw test results

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Run tests:**
   ```powershell
   npx playwright test
   ```

3. **View test report:**
   ```powershell
   npx playwright show-report
   ```

## Useful Commands

- Run a specific test file:
  ```powershell
  npx playwright test tests/amex.spec.ts
  ```
- Open Playwright Inspector:
  ```powershell
  npx playwright test --debug
  ```

## Resources

- [Playwright Documentation](https://playwright.dev/)
