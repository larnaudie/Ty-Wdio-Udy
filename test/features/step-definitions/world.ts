import { setWorldConstructor } from "@wdio/cucumber-framework";
import { expect } from "chai";

class CustomWorld {
    testId : string;
    appID : string;
    constructor(){
        this.appID = "";
        this.testId = "";
    }
}

setWorldConstructor(CustomWorld)
