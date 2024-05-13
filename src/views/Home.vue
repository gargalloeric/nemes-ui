<script setup lang="ts">
import Map from "../components/Map.vue";
import { onMounted, ref } from "vue";
import Footer from "../components/Footer.vue";
import { getDisasters, getRecentDisasters } from "../services/ObtainDisasters.ts";
import { Disaster } from "../model/Disaster.ts";
import { EnumDisasters } from "../model/EnumDisasters.ts";
import { latLng } from "leaflet";
import Alert from "../components/Alert.vue";

const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 13;
const map = ref();

let lastDate: Date;
let initialDate: Date;
let checkedFire: boolean = true;
let checkedMeteo: boolean = true;
let checkedOthers: boolean = true;

const unexpectedError = ref(false);
let datesError = ref(false);

onMounted(async () => {
  const disasters: Disaster[] = await getRecentDisasters();
  console.log(disasters);
  for (const disaster of disasters) {
    map.value.setMarker(disaster.type, latLng([disaster.location.lat, disaster.location.lon]), disaster.name);
  }
});

async function query() {
  console.log(EnumDisasters.Fire);
  datesError.value = false;
  try {
    if (new Date(initialDate) > new Date(lastDate)) {
      datesError.value = true;
      return;
    }
    if (checkedFire) {
      let fires: Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Fire);
      for (const fire of fires) {
        map.value.setMarker(EnumDisasters.Fire, latLng(fire.location.lat, fire.location.lon), fire.description)
      }
    }
    if (checkedMeteo) {
      let meteos: Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Meteorological);
      for (const meteo of meteos) {
        map.value.setMarker(EnumDisasters.Meteorological, latLng(meteo.location.lat, meteo.location.lon), meteo.description)
      }
    }
    if (checkedOthers) {
      let others: Disaster[] = await getDisasters(new Date(initialDate), new Date(lastDate), EnumDisasters.Other);
      for (const other of others) {
        map.value.setMarker(EnumDisasters.Other, latLng(other.location.lat, other.location.lon), other.description)
      }
    }
  }
  catch (error) {
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
        <input type="date" v-model="initialDate" class="input input-bordered w-full max-w-xs" required />
        <div class="label">
          <span class="label-text">Fecha final:</span>
        </div>
        <input type="date" v-model="lastDate" class="input input-bordered w-full max-w-xs" required />
        <div class="divider"></div>
        <div class="form-control">
          <h2 class="text-2xl">Tipos</h2>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="28"
              height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
              <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
            </svg>
            <span class="label-text">Meteorológicas</span>
            <input type="checkbox" v-model="checkedMeteo" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-campfire" width="28" height="28"
              viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 21l16 -4" />
              <path d="M20 21l-16 -4" />
              <path d="M12 15a4 4 0 0 0 4 -4c0 -3 -2 -3 -2 -8c-4 2 -6 5 -6 8a4 4 0 0 0 4 4z" />
            </svg>
            <span class="label-text">Incendios</span>
            <input type="checkbox" v-model="checkedFire" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help-hexagon" width="28"
              height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
              <path d="M12 16v.01" />
              <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
            </svg>
            <span class="label-text">Otras</span>
            <input type="checkbox" v-model="checkedOthers" class="checkbox checkbox-xs" />
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
