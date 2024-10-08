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