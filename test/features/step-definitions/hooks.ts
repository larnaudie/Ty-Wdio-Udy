import { BeforeStep } from "@wdio/cucumber-framework";

BeforeStep(function(){
    // @ts-ignore
    this.testId = browser.options.testId
})