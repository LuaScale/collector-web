# Playwright E2E Test Suite

## Test Coverage Summary

**Total Tests: 67** (excluding visual regression tests)

### Test Files

| File | Tests | Description |
|------|-------|-------------|
| `accessibility.spec.ts` | 24 | Heading hierarchy, landmarks, forms, keyboard navigation |
| `articles.spec.ts` | 4 | Articles listing and detail pages |
| `auth.spec.ts` | 11 | Login and registration forms, validation |
| `boutiques.spec.ts` | 5 | Shops listing and detail pages |
| `categories.spec.ts` | 4 | Categories listing and detail pages |
| `dashboard.spec.ts` | 9 | Protected routes, authenticated dashboard pages |
| `homepage.spec.ts` | 4 | Homepage rendering, navigation, responsiveness |
| `navigation.spec.ts` | 6 | Route navigation, mobile menu |
| `visual.spec.ts` | 8 | Visual regression (skipped by default) |

### Page Coverage

| Page | Route | Covered |
|------|-------|---------|
| Homepage | `/` | ✅ |
| Articles | `/articles` | ✅ |
| Article Detail | `/articles/[id]` | ✅ |
| Categories | `/categories` | ✅ |
| Category Detail | `/categories/[slug]` | ✅ |
| Boutiques | `/boutiques` | ✅ |
| Boutique Detail | `/boutiques/[id]` | ✅ |
| Login | `/connexion` | ✅ |
| Registration | `/inscription` | ✅ |
| Dashboard | `/tableau-de-bord` | ✅ |
| My Shops | `/tableau-de-bord/boutiques` | ✅ |
| New Shop | `/tableau-de-bord/boutiques/nouveau` | ✅ |
| Profile | `/tableau-de-bord/profil` | ✅ |
| Settings | `/tableau-de-bord/parametres` | ✅ |

### Test Types

- **Rendering Tests**: Verify pages load and render correctly
- **Navigation Tests**: Test links and route transitions
- **Form Tests**: Validate form structure, labels, and validation errors
- **Accessibility Tests**: Check heading hierarchy, landmarks, keyboard navigation
- **Responsive Tests**: Mobile viewport testing
- **Auth Tests**: Protected route redirects, mock authentication

## Running Tests

```bash
# Run all tests (3 browsers)
npm test

# Run tests on Chromium only (faster)
npm run test:chromium

# Run tests with UI
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# View test report
npm run test:report
```

## Visual Regression Tests

Visual tests are skipped by default. To create/update baselines:

```bash
npx playwright test tests/visual.spec.ts --update-snapshots
```

## Configuration

- **Base URL**: `http://localhost:3000`
- **Web Server**: Auto-starts `npm run dev` before tests
- **Browsers**: Chromium, Firefox, WebKit
- **Screenshots**: On failure only
- **Traces**: On first retry
