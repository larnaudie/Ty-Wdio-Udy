import request from "supertest";
import reporter from "../helper/reporter";
// console.log(`>>>>>>>>>>> TYPE OF REQUEEEEST: ${typeof request}`)
// console.log(`>>>>>>>>>> NUMERO DE ARGUMENTOS: ${request.length}`)

// console.log(`Whats the definition of the funcion?: ${request.toString()}`)

let payLoad = {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
}

//Vamos a hacer una llamada GET
async function GET(testId: string, baseURL: string, endpoint: string, authToken:string, queryParam: object) {
    if(!baseURL || !endpoint){
        throw Error(`No hay baseURL: ${baseURL} o endpoint ${endpoint} validos`)
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    // reporter.addStep(testId, "info", `making a GET to ${endpoint}`)
    try{
        let resultado = await await request(baseURL)
        .get(endpoint)
        .query(queryParam)
        .auth(authToken,{ type: 'bearer' })
        .set("Content-Type", "application/json")
        .set("Content-Type", "application/json");
      console.log(`<<<<<<<<<<<<<<<<<<< Reusltado: ${JSON.stringify(resultado)}`);
    }catch(err){
        err.message = `Error haciendo una llamada Get al endpoint ${endpoint}, ${err}`
    }

}
async function POST(testId: string, baseURL: string, endpoint: string, authToken:string, payLoad: object) {
    if(!baseURL || !endpoint){
        throw Error(`No hay baseURL: ${baseURL} o endpoint ${endpoint} validos`)
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    // reporter.addStep(testId, "info", `making a GET to ${endpoint}`)
    try{
        let resultado = await await request(baseURL)
        .post(endpoint)
        .auth(authToken,{ type: 'bearer' })
        .set("Content-Type", "application/json")
        .set("Content-Type", "application/json")
        .send(payLoad);
      console.log(`<<<<<<<<<<<<<<<<<<< Reusltado: ${JSON.stringify(resultado.body)}`);
    }catch(err){
        err.message = `Error haciendo una llamada Get al endpoint ${endpoint}, ${err}`
    }

})

export default {GET, POST};

