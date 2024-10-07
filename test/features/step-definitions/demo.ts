import { Given } from "@wdio/cucumber-framework";

//Expresion regular
Given(/^Google page is opened$/,async function(){
    await browser.url("https://www.google.com")
    await browser.pause(7000)
})

//Es lo mismo que lo de arriba, cambia la expresion a una expresion regular.
// Given("Google page is opened",async function(){
//     await browser.url("https://www.google.com")
//     await browser.pause(7000)
// })