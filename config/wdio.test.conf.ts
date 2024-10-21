import { config as baseConfig } from "../wdio.conf";
export const config = Object.assign(baseConfig, {
  //Configuracion del ambiente nuevo
  "goog:chromeOptions": {
    args: [
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  },
  sauceDemoURL: "https://saucedemo.com",
  reqresBaseURL: "https://reqres.in",
  nopeCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
        reportedEnvironmentVars: {
          Environment: "TEST",
          Middleware: "SIT-EAI",
        },
      },
    ],
  ],
  sqlConfig: {
    user: "copeautomation",
    password: "demo",
    database: "AdventureWorksDW2019",
    server: "DESKTOP-PSLNVC8",
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
      trustedConnection: true
    },
  },
});
