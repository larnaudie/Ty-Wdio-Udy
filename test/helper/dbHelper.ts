import sql from "mssql/msnodesqlv8";
import reporter from "../helper/reporter";

// const sqlConfig = {
//   user: "copeautomation",
//   password: "demo",
//   database: "AdventureWorksDW2019",
//   server: "DESKTOP-PSLNVC8",
//   options: {
//     encrypt: false, // for azure
//     trustServerCertificate: false, // change to true for local dev / self-signed certs
//     trustedConnection: true
//   },
// };

// let query = `SELECT TOP 1 *
//               ROM [aDVENTRUEwORKSdw2019].[dbo].[FactSalesQuota]
//               WHERE [Date] = '2010-12-29 00:00:00.000'`;


/**
 * 
 * @param testId 
 * @param config 
 * @param query 
 * @returns db query
 */

async function executeQuery(testId: string, config, query:string) {

    if(!query) throw Error(`No hay query o no es valido el query : ${query}`)
    reporter.addStep(testId, "info", "Ejectuando el db query")

    const pool1 = new sql.ConnectionPool(config);
    const pool1Connect = pool1.connect();

    pool1.on('error', err =>{
        throw err;
    })

    await pool1Connect;
    try{
        const request = pool1.request()
        const result = await request.query(query)
        // console.log(result)
        return result;
    }catch(err){
        throw err
    }
}

export default {executeQuery}
