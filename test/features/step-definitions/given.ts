import { Given } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import logger from "../../helper/logger.ts";
import { url } from "inspector";

Given ("As a standar user I login to inventory web app", async function (dataTable) {

    // logger.info(`ZZZZZZZZZZZZZZZZZZZZZZZZ ${this.testId}: Started to login sause demo app`);

    console.log(`>>>>> MIII TESTID: ${this.testId} >>>>>>>>>>>}`);

    let arrObjetosDT = dataTable.hashes();
    // console.log(`Types of dt: ${typeof arrObjetosDT}`)
    // console.log(`Types of dt: ${typeof arrObjetosDT.constructor}`)
    // console.log(`values of DT:: ${JSON.stringify(arrObjetosDT)}`)

    // @ts-ignore
    await browser.url(browser.options.sauceDemoURL);
    // console.log(`>>>>>>>>>>>>> Test config values: ${JSON.stringify(browser.options)}`)

    try {
        // await $(`input[placeholder="Username"]`).setValue(arrObjetosDT[0]);
        await $(`input[placeholder="Username"]`).setValue("standard_user");
        await $(`input[placeholder="Password"]`).setValue("secret_sauce");
        await $("#login-button").click();
    } catch (err) {
        console.log(`Error en el logueo, reintentando.`);
        await browser.refresh();
        await browser.pause(1000);

        await $(`input[placeholder="Username"]`).setValue("standard_user");
        await $(`input[placeholder="Password"]`).setValue("secret_sauce");
        await $("#login-button").click();
    }
    this.appID = "ASDBD";
})





Given("Login to inventory web app", async function () {
    // console.log(`Test usuario: ${process.env.TEST_STD_USERNAME}`)

    // @ts-ignore
    await browser.url(browser.options.sauceDemoURL);
    // console.log(`>>>>>>>>>>>>> Test config values: ${JSON.stringify(browser.options)}`)

    //capitulo 41, sabemos que esto va en el config file, wdio.conf.ts, NO ACA
    // await browser.setTimeout({implicit: 15000, pageLoad: 10000});

    //agarramos el selector de username y escribimos algo
    // await $(`input[placeholder="Username"]`).setValue(`${process.env.TEST_STD_USERNAME}`);
    //agarramos el selector de password y escirbimos una pass
    // await $(`input[placeholder="Password"]`).setValue(`${process.env.TEST_STD_PASSWORD}`);
    //click en el boton
    // await $("#login-button").click();
    

    //Login con otro usuario;
    //Forma 1 - reloadSession()
    /*
     await browser.reloadSession();
     // await browser.url("https://www.saucedemo.com/");
     //agarramos el selector de username y escribimos algo
     await $(`input[placeholder="Username"]`).setValue("probable_user");
     //agarramos el selector de password y escirbimos una pass
     await $(`input[placeholder="Password"]`).setValue("secret_sauce");
     //click en el boton
     await $("#login-button").click();
    */

    //Forma 2 - Try-Catch
    /** /
    try {
        await $(`input[placeholder="Username"]`).setValue("standard_user");
        await $(`input[placeholder="Password"]`).setValue("secret_sauce");
        await $("#login-button").click();
    } catch (err) {
        console.log(`Error en el logueo, reintentando.`);
        await browser.refresh();
        await browser.pause(1000);

        await $(`input[placeholder="Username"]`).setValue("standard_user");
        await $(`input[placeholder="Password"]`).setValue("secret_sauce");
        await $("#login-button").click();
    }
    await browser.back();
    await browser.pause(5999);
    await browser.forward()
    */
   await browser.debug()
})