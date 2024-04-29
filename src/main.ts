import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import {BASE_URL} from "./utils/Constants.ts";
import {Disaster} from "./model/Disaster.ts";
import {EnumDisasters} from "./model/EnumDisasters.ts";
import {Coordinates} from "./model/Coordinates.ts";
import {setZonesData, zonesData} from "./utils/data.ts";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

const REGISTER_URL: string = `${BASE_URL}/zone`
const resp = await fetch(REGISTER_URL, {
    method: 'GET'
})
const data = await resp.json();
setZonesData(convertToJson(data));

function convertToJson(inputData) {
    let outputData = {
        "type": "FeatureCollection",
        "features": []
    };
    inputData.forEach(item => {
        let feature = {
            "type": "Feature",
            "id": [item.centerLon, item.centerLat], // id as center lat and lon
            "geometry": {
                "type": "Polygon",
                "coordinates": [item.polygons.map(polygon => [polygon.lon, polygon.lat])] // mapping polygons to coordinates
            }
        };
        outputData.features.push(feature);
    });
    return outputData;
}