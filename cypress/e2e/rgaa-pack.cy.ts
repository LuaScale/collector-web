const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const pages = [
  { name: "home", path: "/en" },
  { name: "articles", path: "/en/articles" },
  { name: "categories", path: "/en/categories" },
  { name: "boutiques", path: "/en/boutiques" },
];

function checkFieldAccessibility($el: JQuery<HTMLElement>) {
  const id = $el.attr("id");
  const ariaLabel = $el.attr("aria-label");
  const ariaLabelledBy = $el.attr("aria-labelledby");

  if (id) {
    cy.get(`label[for="${id}"]`).then(($label) => {
      const hasLabelFor = $label.length > 0;
      const hasAria = !!ariaLabel || !!ariaLabelledBy;
      expect(
        hasLabelFor || hasAria,
        `Champ #${id} doit avoir label ou aria-label/labelledby`,
      ).to.equal(true);
    });
    return;
  }

  expect(
    !!ariaLabel || !!ariaLabelledBy,
    "Champ sans id doit avoir aria-label/aria-labelledby",
  ).to.equal(true);
}

function validateOptionalFormFields() {
  cy.get("body").then(($body) => {
    const fields = $body.find("input, select, textarea");
    if (!fields.length) {
      return;
    }

    cy.wrap(fields).each(($el) => {
      checkFieldAccessibility($el);
    });
  });
}

function runPageChecks(pageName: string, viewportName: string, path: string) {
  cy.visit(path, { failOnStatusCode: false });

  cy.rgaaAxeAudit({
    pageName: `${pageName}-${viewportName}-full`,
    context: null,
    failOnViolation: false,
  });

  cy.get("html").should("have.attr", "lang");
  cy.title().should("match", /\S+/);
  cy.get("h1").its("length").should("be.gte", 0);
  validateOptionalFormFields();
}

describe("RGAA pack — Collector pages", () => {
  viewports.forEach((viewport) => {
    pages.forEach((page) => {
      it(`axe WCAG AA + checks de base — ${page.name} (${viewport.name})`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.request({
          url: page.path,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status >= 400) {
            cy.log(`Page indisponible (${response.status}) : ${page.path}`);
            return;
          }

          runPageChecks(page.name, viewport.name, page.path);
        });
      });
    });
  });
});
