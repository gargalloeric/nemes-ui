import {Disaster} from "../model/Disaster.ts";
import {EnumDisasters} from "../model/EnumDisasters.ts";
import {BASE_URL} from "../utils/Constants.ts";
import {Coordinates} from "../model/Coordinates.ts";

export async function getRecentDisasters(): Promise<Disaster[]>{
    const REGISTER_URL: string = `${BASE_URL}/catastrophe`
    const resp = await fetch(REGISTER_URL, {
        method: 'GET'
    })
    const data = await resp.json();

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
    return disasters;
}

export async function getDisasters(): Promise<Disaster[]>{
  //todo

}