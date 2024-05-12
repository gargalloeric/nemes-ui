import {useTokenStore} from "../stores/token.ts";
import {BASE_URL} from "../utils/Constants.ts";
import {Coordinates} from "../model/Coordinates.ts";

export async function saveZoneOfInterest(selected : Coordinates[], selectedEvents: string[]){
    console.log("Saved zones: " + selected[0].lon);
    console.log("Saved events: " + selectedEvents);
    const tokenStored = useTokenStore()
    const REGISTER_URL: string = `${BASE_URL}/subscription/create`
    const resp = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenStored.token}`
        },
        body: JSON.stringify({
            centerLat: selected[0].lon,
            centerLon: selected[0].lat,
            eventsSeverity: ["Minor", "Minor"],
            eventsName: selectedEvents
        })
    });
}