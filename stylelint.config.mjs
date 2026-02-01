/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    /* formatting relaxations */
    "rule-empty-line-before": null,
    "declaration-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "import-notation": "url",

    /* vendor exceptions */
    "property-no-vendor-prefix": [
      true,
      { ignoreProperties: ["backdrop-filter"] },
    ],

    /* CSS Modules */
    "property-no-unknown": [
      true,
      { ignoreProperties: ["composes"] },
    ],
    "scss/property-no-unknown": [
      true,
      { ignoreProperties: ["composes"] },
    ],
  },
};
