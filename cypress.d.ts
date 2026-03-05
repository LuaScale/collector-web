/// <reference types="cypress" />
/// <reference types="cypress-axe" />

declare namespace Cypress {
  interface Chainable {
    rgaaAxeAudit(options?: {
      pageName?: string;
      context?: string | null;
      failOnViolation?: boolean;
    }): Chainable<void>;
  }
}
