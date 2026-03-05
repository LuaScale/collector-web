import "cypress-axe";

type AxeViolation = {
  id: string;
  nodes: Array<{
    target?: unknown[];
    failureSummary?: string;
    any?: Array<{ message: string }>;
    all?: Array<{ message: string }>;
  }>;
};

function extractContrastRatios(violations: AxeViolation[]) {
  const contrastRatioWithLabel = /contrast ratio of\s*([0-9.]+:1)/i;
  const contrastRatioGeneric = /([0-9.]+:1)/;

  return violations
    .filter((violation) => violation.id === "color-contrast")
    .flatMap((violation) =>
      violation.nodes.map((node) => {
        const raw =
          node.failureSummary ||
          node.any?.map((entry) => entry.message).join(" | ") ||
          node.all?.map((entry) => entry.message).join(" | ") ||
          "";

        const match = contrastRatioWithLabel.exec(raw) || contrastRatioGeneric.exec(raw);

        return {
          target: (node.target || []).map(String).join(", "),
          ratio: match ? match[1] : null,
          summary: raw,
        };
      }),
    );
}

Cypress.Commands.add(
  "rgaaAxeAudit",
  ({ pageName, context = null, failOnViolation = true } = {}) => {
  cy.injectAxe();

  const options = {
    runOnly: {
      type: "tag" as const,
      values: ["wcag2a", "wcag2aa", "wcag21aa"],
    },
    rules: {
      "color-contrast": { enabled: true },
      "document-title": { enabled: true },
      "html-has-lang": { enabled: true },
      "image-alt": { enabled: true },
      label: { enabled: true },
      "link-name": { enabled: true },
      "button-name": { enabled: true },
    },
  };

  const logViolations = (violations: unknown[]) => {
    const normalizedViolations = violations as AxeViolation[];
    const report = {
      page: pageName || "unknown",
      url: globalThis.location.href,
      createdAt: new Date().toISOString(),
      violations: normalizedViolations,
      contrastRatios: extractContrastRatios(normalizedViolations),
    };

    const safeName = (pageName || "report")
      .replaceAll(/[^a-z0-9-_]/gi, "_")
      .toLowerCase();

    cy.task("writeJsonReport", {
      filename: `${safeName}.axe.json`,
      data: report,
    });
  };

  const axeContext = context ?? undefined;
    cy.checkA11y(axeContext, options, logViolations, !failOnViolation);
  },
);
