const axios = require("axios");

const WEATHER = require("../models/Weather");


require('dotenv').config({path: "./../../../.env"});

const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

class Weather {

     getWeatherData = async (zipCode, tempMetric) => {


        let url = `${baseUrl}?zip=${zipCode},us&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;


        return (await axios(url)).data;
    }


    saveWeatherDataToMongo = async (zipCode, data) => {
        const filter = {
            zip: zipCode
        }

        const replace = {
            ...filter,
            ...data,
            data: Date.now()
        }
        await this.findOneReplace(filter, replace);
    }


    getWeatherDataFromMongo = async (zipCode) => {
        return WEATHER.findOne({zip: zipCode});
    }


    async findOneReplace(filter, replace) {
        await WEATHER.findOneAndReplace(filter, replace, {new: true, upsert: true});
    }
}

module.exports = Weather;