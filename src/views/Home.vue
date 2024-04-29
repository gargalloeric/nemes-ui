<script setup lang="ts">
import Map from "../components/Map.vue";
import {onMounted, ref} from "vue";
import Footer from "../components/Footer.vue";
import {getDisasters, getRecentDisasters} from "../services/ObtainDisasters.ts";
import {Disaster} from "../model/Disaster.ts";
import {EnumDisasters} from "../model/EnumDisasters.ts";
import {latLng} from "leaflet";
import Alert from "../components/Alert.vue";

const initLatLang: L.LatLngExpression = [40.415361175393144, -3.701523140526825];
const initZoom: number = 6;
const map = ref();

let lastDate : Date;
let initialDate : Date;
let checkedFire : boolean = true;
let checkedMeteo : boolean = true;
let checkedOthers : boolean = true;

const unexpectedError = ref(false);
let datesError = ref(false);

onMounted(async() => {
  const disasters : Disaster[] = await  getRecentDisasters();
  console.log(disasters);
  for(const disaster of disasters){
    map.value.setMarker(disaster.type, latLng([disaster.location.lat, disaster.location.lon]), disaster.name);
  }
});

async function query(){
  console.log(EnumDisasters.Fire);
  datesError.value = false;
  try {
    if (new Date(initialDate) > new Date(lastDate)){
      datesError.value = true;
      return;
    }
    if (checkedFire){
      let fires : Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Fire);
      for (const fire of fires) {
        map.value.setMarker(EnumDisasters.Fire, latLng(fire.location.lat, fire.location.lon), fire.description)
      }
    }
    if (checkedMeteo){
      let meteos : Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Meteorological);
      for (const meteo of meteos) {
        map.value.setMarker(EnumDisasters.Meteorological, latLng(meteo.location.lat, meteo.location.lon), meteo.description)
      }
    }
    if (checkedOthers){
      let others : Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Other);
      for (const other of others) {
        map.value.setMarker(EnumDisasters.Other, latLng(other.location.lat, other.location.lon), other.description)
      }
    }
  }
  catch (error){
    unexpectedError.value = true;
    console.log(error);
  }
}

</script>

<template>
  <Alert v-if="unexpectedError" msg="No se han encontrado datos para las fechas seleccionadas"></Alert>
  <Alert v-if="datesError" msg="La fecha inicial no puede ser posterior a la fecha final"></Alert>
  <div class="flex md:flex-row sm:flex-col mt-2">
    <div class="flex flex-col mr-4 ml-4">
      <form @submit.prevent="query">
      <h2 class="text-2xl">Rango temporal</h2>
      <div class="label">
        <span class="label-text">Fecha inicial:</span>
      </div>
      <input type="date" v-model="initialDate" class="input input-bordered w-full max-w-xs" required/>
      <div class="label">
        <span class="label-text">Fecha final:</span>
      </div>
      <input type="date" v-model="lastDate" class="input input-bordered w-full max-w-xs" required/>
      <div class="divider"></div>
      <div class="form-control">
        <h2 class="text-2xl">Lista de catastrofes</h2>
        <label class="label cursor-pointer">
          <span class="label-text">Meteorológicas</span>
          <input type="checkbox" v-model="checkedMeteo" class="checkbox checkbox-info" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Incendios</span>
          <input type="checkbox" v-model="checkedFire" class="checkbox checkbox-error" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Otras</span>
          <input type="checkbox" v-model="checkedOthers" class="checkbox checkbox-warning" />
        </label>
      </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline">Consultar</button>
        </div>
      </form>
    </div>
    <Map class="rounded-lg h-screen mx-5" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

  <Footer></Footer>
</template>
