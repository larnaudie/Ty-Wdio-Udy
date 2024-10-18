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
});
