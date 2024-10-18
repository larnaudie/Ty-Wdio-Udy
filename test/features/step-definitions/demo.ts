import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from 'chai';


//Expresion regular
Given(/^Google page is opened$/, async function () {
    await browser.url("https://www.google.com")
    await browser.pause(1000)
    //agregado en el capitulo 39
    // console.log(`>>>>>>>> BrowserObj: ${JSON.stringify(browser)}`)
})

// Es lo mismo que lo de arriba, cambia la expresion a una expresion regular.
// Given("Google page is opened",async function(){
//     await browser.url("https://www.google.com")
//     await browser.pause(7000)
// })

When(/^Search with (.*)$/, async function (searchItem) {
    // console.log(`${searchItem}`);
    let ele = await $(`#APjFqb`);
    await ele.setValue(searchItem);
    await browser.keys("Enter");

    // //agregado en el capitulo 39
    // console.log(`>>>>>>>> element obj: ${JSON.stringify(ele)}`)
})

Then(/^Click on the first search result$/, async function () {
    let ele = await $(`.dURPMd .hlcw0c:nth-child(1) .eKjLze`);
    await ele.click();
})

Then(/^URL should match (.*)$/, async function (expectedUrl) {
    // console.log(`------------------------>>>  Url esperada: ${expectedUrl}`)

    //capitulo 40 waitUntil
    //probando con un objeto browser, peude ser con un elemento en vez de browser.
    await browser.waitUntil(async function(){
        return await browser.getTitle() === `WebdriverIO · Marco de prueba de automatización móvil y navegador de próxima generación para Node.js | WebdriverIO`
    }, {timeout: 20000, interval: 500, timeoutMsg:`Pah, mostro, no pude hacerlo funcionarl; ${browser.getTitle()}`} )

    let url = await browser.getUrl();
    expect(url).to.equal(expectedUrl);
})

Given("A web page is opened", async function () {
    await browser.url("/inputs");
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000, });
    await browser.maximizeWindow();

})


When("Perform web Interactions", async function () {
    let selector = await $(`input[type="number"]`);
    // Hacemos click en el selector
    await selector.click();
    // Escribir un valor en el input
    await selector.setValue("1234");
    // await browser.debug();
    // await browser.pause(3000);

    //Escribir lento
    /**
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
    */

    //Dropdown
    /**
    await browser.url("/dropdown");
    let dropdown = await $(`#dropdown`);
    //Ejemplo 1
    // let option2 = await $(`#dropdown option:nth-child(2)`);
    // dropdown.click();
    // let texto = await option2.getText()
    // expect(texto).to.equal("Option 1");

    //Ejemplo 2
    //selecciono por valor de texto que tenga un elemento
    // await dropdown.selectByVisibleText("Option 1");

    //selecciono por nombre y valor de atributo DENTRO de un TAG, en este caso #dropdown
    await dropdown.selectByAttribute("value", "1")

    //selecciono por numero de indice
    await dropdown.selectByIndex(2);

    // array selectores
    let arrSelectores = await $$(`select option`); // Asegúrate de que esto devuelva un array directamente
    let arr: string[] = []; // Especificamos que arr será un array de strings

    // Verifica que arrSelectores sea un array
    if (Array.isArray(arrSelectores)) {
        for (let i = 0; i < arrSelectores.length; i++) {
            let ele = arrSelectores[i];
            let val = await ele.getText(); // Usar 'await' si 'getText' es una promesa
            arr.push(val);
            console.log(val);
        }
    } else {
        console.log('arrSelectores no es un array');
    }

    console.log(`Option Array: ${arr}`);
    // await browser.debug();*/

    //Checkbox
    /**
    await browser.url("/checkboxes");
    let checkbox1 = await $(`#checkboxes > input[type=checkbox]:nth-child(1)`);
    let checkbox2 = await $(`#checkboxes > input[type=checkbox]:nth-child(3)`);
    await checkbox1.click();
    await checkbox2.click();
    let isCheckbox1Checked;
    let isCheckbox2Checked;
    
    //condicion isSelected() checkbox
    if(await checkbox1.isSelected()){
        await checkbox1.click();
        isCheckbox1Checked = true;
        expect(isCheckbox1Checked).to.be.true;
    }
    if(!await checkbox2.isSelected()){
        console.log("No esta seleccionado")
        isCheckbox2Checked = false;
        expect(isCheckbox2Checked).to.be.false;
    }

    //Multiple valroes checkbox
    let arrCheckboxes = $$(`//*[@id="checkboxes"]/input`);
    if(Array.isArray(arrCheckboxes)){
        for(let i = 0; i < arrCheckboxes.length; i++){
            let currentElement = arrCheckboxes[i];
            if(!await currentElement.isSelected()){
                currentElement.click();
            }
        }
    }
    await browser.debug();*/

    //Pestañas/Tabs
    /**
     
    //Open new window
    await browser.url("/windows");
    await $(`a[href="/windows/new"]`).click();
    await $(`a[href*="elementalselenium"]`).click();
    let currentWindowTitle = await browser.getTitle();
    let parentWindowHandle = await browser.getWindowHandle();
    console.log(`current windows: ${currentWindowTitle}`)

    //Switch to specific window
    let arrPestañas = await browser.getWindowHandles();
    for (let i = 0; i < arrPestañas.length; i++) {
        console.log(`Windows ${i}, ${arrPestañas[i]}`)
        await browser.switchToWindow(arrPestañas[i]);
        currentWindowTitle = await browser.getTitle();
        console.log(`${currentWindowTitle}`);
        // no encuentra selector, da error
        // if(currentWindowTitle === "Home | Elemental Selenium"){
        //     await browser.switchToWindow(arrPestañas[i]);
        //     let h1ElementTexto = await $('.container .hero__title').getText();
        //     console.log(`Texto: ${h1ElementTexto}`);
        //     break;
        // }
    }

    await browser.switchToWindow(parentWindowHandle);
    let currentWindowText = await $('.example h3').getText();
    console.log(`Texto obtenido; ${currentWindowText}`);

    await browser.debug();
     */

    //Alert/Popups
    /**
    // await browser.url("/javascript_alerts");

    //Click en el alert de confirm
    // await $(`button[onclick="jsAlert()"]`).click();

    //Click en el alert confirm
    // await $(`button[onclick="jsConfirm()"]`).click();

    //Click en alert prompt
    // await $(`button[onclick="jsPrompt()"]`).click();

    // await browser.pause(5000);

    //NO ANDUVO NADA, problema al hacer click en el elemento isAlertOpen no da true
    // if (await browser.isAlertOpen()) {
    //acepta el alert
    // await browser.acceptAlert();

    //rechaza el alert
    // await browser.dismissAlert();

    //almacenar texto
        // let alertText = await browser.getAlertText();
        // console.log(`alert: ${alertText}`);
        // await browser.sendAlertText("Holaaaaa")
        // await browser.acceptAlert();
        // await browser.pause(5000);
    // }

    //----------
    //Practicamos manejar Browser Auth
    await browser.url("/basic_auth");

    await browser.debug();
     
     */

    //File Upload
    /** 
    await browser.url("/upload");

    await $(`#file-upload`).addValue(`${process.cwd()}/data/fileupload/dummy.txt`)
    await $(`#file-submit`).click();

    await browser.debug();
    */

    //Frames
    /**
    
    //HAY PROBLEMA, NOS QUIERE COBRAR PA USAR LOS SELECTORES ACA.
    // await browser.url("/frames");

    //baseURL en WDIO cambió a: https://practice-automation.com/iframes/
    await browser.url("")
    await $("#content > div > ul > li:nth-child(2) > a").click();
    //Vamos a probar escirbir directamente -> no va a funcionar por estar dentro de un iframe
    // await $("#tinymce").setValue("Escribiendo en el body");

    //Vamos a seleccionar el iframe
    let elemento = await $("#mce_0_ifr");
    await browser.switchToFrame(elemento);
    //ahora funciona por que ingrresamos al Frame
    await $("#tinymce").setValue("Escribiendo en el body");
    await browser.switchToParentFrame();

    await browser.debug();
    */

    //Frames Pt2 - Key press
    /**
     * 
    //HAY PROBLEMA, NOS QUIERE COBRAR PA USAR LOS SELECTORES ACA.
    await browser.url("/frames");

    await $("#content > div > ul > li:nth-child(2) > a").click();

    //Vamos a seleccionar el iframe
    let elemento = await $("#mce_0_ifr");
    await browser.switchToFrame(elemento);
    await browser.keys(["Meta","A"]);
    //ahora funciona por que ingrresamos al Frame
    await $("#tinymce").setValue("Escribiendo en el body");
    await browser.switchToParentFrame();
    await browser.debug();
    
     */

    //Basic Scrolling
    /**
     * 
    //aca usamos otra baseURL en WDIO
    await browser.url("");
    //podemos aplicar el scrollIntoView() a un selector.
    //no va a cubrir toda la ventana con ese elemento sino que cuando se vea corta el scroll.
    await $("#CardInstancestdD8qHC05EJNQpWtKsYuQ").scrollIntoView(false)
    
     */

    //Web Table 1
    /*
        //extraer informacion de cuantas filas hay
        await browser.url("/tables")
        let largoDeFilas = await $$(`#table1 tbody tr`).length;
        console.log(largoDeFilas)
        expect(largoDeFilas).to.equal(4);
        //extraer informacion de cuantas columnas hay
        let largoDeColumnas = await $$(`#table1 thead th`).length;
        console.log(largoDeFilas)
        expect(largoDeColumnas).to.equal(6);
    
        let listaDePersonas = [];
        //va recorriendo las filas
        for (let i = 0; i < largoDeFilas; i++) {
            //va recorreindo las columnas
            console.log(`------FILA ${i}-----------`)
            let personaActual = {
                apellido: "",
                nombre: "",
                precio: "",
                mail: "",
                web: "",
            }
            for (let j = 0; j < largoDeColumnas; j++) {
                let valorDeCelda = await $(`#table1 > tbody > tr:nth-child(${i + 1}) > td:nth-child(${j + 1})`).getText()
                if (j === 0) personaActual.apellido = valorDeCelda;
                if (j === 1) personaActual.nombre = valorDeCelda;
                if (j === 2) personaActual.precio = valorDeCelda;
                if (j === 3) personaActual.mail = valorDeCelda;
                if(j === 4) personaActual.web = valorDeCelda;
            }
            listaDePersonas.push(personaActual);
        }
        console.log(`>>>>>>>>> ${JSON.stringify(listaDePersonas)}`)
        
        await browser.debug();
        */

    //Web Table 2
    /** 
    await browser.url("/tables")
    let largoDeFilas = await $$(`#table1 tbody tr`).length;
    let largoDeColumnas = await $$(`#table1 thead th`).length;
    let listaDePersonas2 = [];
    //va recorriendo las filas
    for (let i = 0; i < largoDeFilas; i++) {
        //va recorreindo las columnas
        console.log(`------FILA ${i}-----------`)
        let personaActual = {
            apellido: "",
            nombre: "",
            precio: "",
            mail: "",
            web: "",
        }
        for (let j = 0; j < largoDeColumnas; j++) {

            let valorDeCelda = await $(`#table1 > tbody > tr:nth-child(${i + 1}) > td:nth-child(${j + 1})`).getText()

            let nombreFilaActual = await $(`#table1 > tbody > tr:nth-child(${i + 1}) > td:nth-child(2)`).getText()

            if (nombreFilaActual === "Jason") {
                if (j === 0) personaActual.apellido = valorDeCelda;
                if (j === 1) personaActual.nombre = valorDeCelda;
                if (j === 2) personaActual.precio = valorDeCelda;
                if (j === 3) personaActual.mail = valorDeCelda;
                if (j === 4) personaActual.web = valorDeCelda;
            }
        }
        
        if(personaActual.nombre){
            listaDePersonas2.push(personaActual);
        }
    }
    console.log(`>>>>>>>>> ${JSON.stringify(listaDePersonas2)}`)

    await browser.debug();
    */

    //cambiamos baseUrl a la de amazon
    //Advance Scrolling
    /**
        await browser.url("");
    //Vamos a hacer un scroll hacia abajo usando execute
    //hace scroll hacia abajo
    await browser.execute(() => {
        window.scrollBy(0, window.innerHeight)
    })

    //hace scroll hacia arriba
    await browser.execute(() => {
        window.scrollBy(0, -window.innerHeight)
    })

    //hago scroll a una parte especifica de la ventana en pixeles
    await browser.execute(() => {
        window.scrollTo(0, 1500)
    })

    //hago scroll hacia abajo aplicando un metodo 
    await browser.execute(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    //hago scroll hacia arriba aplicando un metodo 
    await browser.execute(() => {
        window.scrollTo(0, document.body.scrollTop)
    })

    await browser.debug(); 
    */



})

