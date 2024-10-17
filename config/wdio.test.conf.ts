import { config as baseConfig } from '../wdio.conf';
require('dotenv').config();
export const config = Object.assign(baseConfig, {
    //Configuracion del ambiente nuevo
    environment: "TEST",
    sauceDemoURL: "https://saucedemo.com"
})

