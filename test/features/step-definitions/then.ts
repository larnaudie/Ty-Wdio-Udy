import { Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../helper/logger.ts";
import reporter from "../../helper/reporter.ts"
import request from 'supertest';
import fs from "fs";
import nopCommerceCustlistPage from "../../page-objects/nopcommerce.custlist.page"
import dbHelper from "../../helper/dbHelper.ts"
import { config } from '../../../config/wdio.test.conf';
import constants from "../../../data/fileupload/constants.json"

//todos los selectores que van a ir aca, deber ir dentro de la clase en
// page_objects y accederemos a ellos mediante el nombre de la clase, instanciandola aqui

//baseUrl: 'http://localhost'-> en WDIO se trabaja sobre esa url
Then(/^Inventory page should list (.*)$/, async function (nroDeProductos) {
  // throw Error("Falle por que quiero y puedo")//insentiva a wdio.conf.ts a sacar screenshot

  
  // console.log(`>>>>>>>>> this.appID: ${this.appID}`)
  try {
    console.log(`>>>>> MIII TESTID: ${this.testId}`);
    // console.log(wdio); //error comun
    if (!nroDeProductos)
      throw Error(`Invalid number provided: ${nroDeProductos}`);
    let listaElementos = await $$(".inventory_item_name"); // Espera a que se resuelva la promesa
    // console.log(`------------------>>>>>>  LISTAAA ${listaElementos.length}`);
    try {
      expect(listaElementos.length).to.equal(Number(nroDeProductos)); // Asegúrate de que sea un número
    } catch (err) {
      // //En vez de usar el logger. error, podemos usar el reporter que creamos en rpeorter.ts
      // logger.error(`Known bug ${err.message}:`);
      reporter.addStep(this.testId, "error", "Falló el contador Inventory page should list... ", true, "JIRA-332")
    }
  } catch (err) {
    console.log(`<<<<<<<<< NOMBRE DEL ERROR: ${err.name}`);
    console.log(`>>>>>>>>> mensaje del error: ${err.message}`);
    console.log(`>>>>>>>>>> tipo de dato del err: ${typeof err}`);
    err.message = `Esta este error: ${err.message}`
    throw err //hacemos que lance el error cuando
    // logger.error(err.message);
  }
});

//baseUrl: 'http://localhost'-> en WDIO se trabaja sobre esa url
Then(/^Validate all products have valid price$/, async function () {
  logger.info(`ZZZZZZZZZZZZZZZZZZZZZZZZ ${this.testId}: CHECKING PRICEEE`);

  let listaDePrecios = await $$(`.inventory_item_price`);
  let listaDePreciosEditado = [];
  if (Array.isArray(listaDePrecios)) {
    for (let i = 0; i < listaDePrecios.length; i++) {
      let textoPrecioEntero = await listaDePrecios[i].getText();
      //OPCIONES DE CORTAR EL $:
      /*
            //1) SLICE -> recorta el primer caracter
            // textoPrecioEntero = Number(textoPrecioEntero.slice(1));

            //2) substring -> elimina el primer caracter
            // textoPrecioEntero =  textoPrecioEntero.substring(1);

            //3) replace -> reemplaza el caracter deseado
            // textoPrecioEntero =  textoPrecioEntero.replace("$",'');

            //Asercion 1)
            // expect(textoPrecioEntero).greaterThan(0);
            */
      listaDePreciosEditado.push(textoPrecioEntero);
    }
  }
  // console.log(`<<<<<<<<<<<< Lista con $: ${listaDePreciosEditado}`)

  //MAP -> recorre cada elemento de la lista

  let listaDePreciosNumerico = listaDePreciosEditado.map(
    (ele) =>
      //nos devuelve el numero redondeado.
      // parseInt(ele.replace("$", ""))

      //Nos devuelve el numero con decimales
      +ele.replace("$", "")
  );
  // console.log(`<<<<<<<<<<<< Lista sin $: ${listaDePreciosNumerico}`)

  //FILTER -> Sirve para filtrar elementos en un array
  let listaNumerosInvalidos = listaDePreciosNumerico.filter(
    (elementoActual) => elementoActual <= 0
  );
  // console.log(`<<<<<<<<<<<< Lista de numeros invalidos: ${listaNumerosInvalidos}`);
  expect(listaNumerosInvalidos.length).to.equal(0);
});

Then ("Validate DB result", async function () {
  try {
    //Execute DB SQL
    let testId = this.testId
    let res
    await browser.call (async function () {
      res = await dbHelper.executeQuery(testId, browser.config.sqlConfig, constants.DB_Queries.GET_SALES_QUOTE)
    })
    ///@ts-ignore
      reporter.addStep(this.testId, "debug", `Db response received, data: ${JSON.stringify(res)}`)

    //Store results
    let data = JSON.stringify(res, undefined, 4)
    let filename = `${process.cwd()}/data/db-res/dbresults.json`
    fs.writeFileSync(filename, data)
    reporter.addStep(this.testId, "info", `DB response storted in json file`)
  } catch (error) {
    error.message = `${this.testId}: Failed at checking DB results, ${error.message}`
    throw error
  }
})
