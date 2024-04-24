import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import {BASE_URL} from "./utils/Constants.ts";
import {Disaster} from "./model/Disaster.ts";
import {EnumDisasters} from "./model/EnumDisasters.ts";
import {Coordinates} from "./model/Coordinates.ts";

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
/*
let disasters: Disaster[] = [];

for (const key in data) {
    let _data = data[key];
    console.log(_data.event);
    disasters.push(
        new Disaster(_data.name,
            _data.description,
            _data.event.severity,
            _data.startDate,
            _data.lastValidDate,
            EnumDisasters[ _data.event.eventName as keyof typeof EnumDisasters],
            new Coordinates(_data.zone.center.lat, _data.zone.center.lon),
            _data.zone.radius));
}
console.log(disasters);
return disasters;*/