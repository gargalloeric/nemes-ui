import {Coordinates} from "./Coordinates.ts";

export class Disaster{
    constructor(name: string, description: string, danger: number, initialDate: Date, lastDate: Date, type: EnumDisasters, location: Coordinates, radius: number) {
        this.name = name;
        this.description = description;
        this.danger = danger;
        this.initialDate = initialDate;
        this.lastDate = lastDate;
        this.type = type;
        this.location = location;
        this.radius = radius;
    }
    name: string;
    description: string;
    danger: number;
    initialDate: Date;
    lastDate: Date;
    type: EnumDisasters;
    location: Coordinates;
    radius: number;

}