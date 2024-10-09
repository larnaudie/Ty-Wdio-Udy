import { Given, When, Then } from "@wdio/cucumber-framework";
import {expect} from 'chai';

//Expresion regular
Given(/^Google page is opened$/,async function(){
    await browser.url("https://www.google.com")
    // await browser.pause(7000)
})

//Es lo mismo que lo de arriba, cambia la expresion a una expresion regular.
// Given("Google page is opened",async function(){
//     await browser.url("https://www.google.com")
//     await browser.pause(7000)
// })

When (/^Search with (.*)$/,async function (searchItem) {
    console.log(`${searchItem}`);
    let ele = await $(`#APjFqb`);
    await ele.setValue(searchItem);
    await browser.keys("Enter");
})

Then (/^Click on the first search result$/,async function () {
    let ele = await $(`#rso > div:nth-child(1) > div > div > div > div > div > div > div > div.yuRUbf > div > span > a > h3`);
    await ele.click();
})

Then (/^URL should match (.*)$/,async function (expectedUrl) {
    let url = await browser.getUrl();
    expect(url).to.equal(expectedUrl);
})

Given ("A  web page is opened", async function () {
    await browser.url("/inputs");
    await browser.setTimeout({implicit: 15000, pageLoad: 10000,});
    await browser.maximizeWindow();

})


When  ("Perform web Interactions", async function () {
    let selector = await $(`input[type="number"]`);
    // Hacemos click en el selector
    await selector.click();
    // Escribir un valor en el input
    await selector.setValue("1234");
    // await browser.debug();
    // await browser.pause(3000);

    //Escribir lento
    let numero = 12345;
    let numeroString = numero.toString();
    for (let i = 0; i < numeroString.length; i++) {
        let currentElement = numeroString.charAt(i);
        await browser.pause(2000);
        //simula la forma que tenemos de hacer enter.
        await browser.keys(currentElement);
    }

    //implementamos el moveTo o scrollIntoView()
    await browser.url("");
    let selector2 = await $(`a[href="/tinymce"]`);
    // await selector2.moveTo();
    await selector2.scrollIntoView()

})