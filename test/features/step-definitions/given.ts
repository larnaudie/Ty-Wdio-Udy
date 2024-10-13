import { Given } from "@wdio/cucumber-framework";
import { expect } from 'chai';

Given ("Login to inventory web app", async function() {
    await browser.url("https://www.saucedemo.com/");
    await browser.setTimeout({implicit: 15000, pageLoad: 10000});
    //agarramos el selector de username y escribimos algo
    await $(`input[placeholder="Username"]`).setValue("standard_user");
    //agarramos el selector de password y escirbimos una pass
    await $(`input[placeholder="Password"]`).setValue("secret_sauce");
    //click en el boton
    await $("#login-button").click();
})