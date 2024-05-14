<script setup lang="ts">
import Map from "../components/Map.vue";
import {onMounted, Ref, ref} from "vue";
import Footer from "../components/Footer.vue";
import { getDisasters, getRecentDisasters } from "../services/ObtainDisasters.ts";
import { Disaster } from "../model/Disaster.ts";
import { EnumDisasters } from "../model/EnumDisasters.ts";
import { latLng } from "leaflet";
import Alert from "../components/Alert.vue";

const initLatLang: L.LatLngExpression = [40.415361175393144, -3.701523140526825];
const initZoom: number = 6;
const map = ref();

let lastDate: Date;
let initialDate: Date;
const checkedCoast: Ref<boolean> = ref(false);
const checkedWind: Ref<boolean> = ref(false);
const checkedSnow: Ref<boolean> = ref(false);
const checkedRain: Ref<boolean> = ref(false);
const checkedStorm: Ref<boolean> = ref(false);
const checkedFog: Ref<boolean> = ref(false);
const isSaved: Ref<boolean> = ref(false);

const unexpectedError = ref(false);
let datesError = ref(false);

onMounted(async () => {
  const disasters: Disaster[] = await getRecentDisasters();
  for(const disaster of disasters){
    map.value.setMarker(disaster.type, latLng([disaster.location.lat, disaster.location.lon]), disaster.name);
  }
  console.log("representados");
});

async function query() {
  console.log(EnumDisasters.Fire);
  datesError.value = false;
  let events: string[] = [];
  try {
    if (new Date(initialDate) > new Date(lastDate)) {
      datesError.value = true;
      return;
    }
    switch (true){
      case checkedRain.value:
        events.push("Lluvias");
        break;
      case checkedCoast.value:
        events.push("Costeros");
        break;
      case checkedWind.value:
        events.push("Vientos");
        break;
      case checkedFog.value:
        events.push("Nieblas");
        break;
      case checkedSnow.value:
        events.push("Nevadas");
        break;
      case checkedStorm.value:
        events.push("Tormentas");
        break;
    }
    console.log(formatDate(new Date(initialDate)));
    let disasters: Disaster[] = await getDisasters(formatDate(new Date(initialDate)), formatDate(new Date(lastDate)), events);
    console.log(disasters);
    map.value.clearMarkers();
    for (const disaster of disasters) {
      map.value.setMarker(disaster.type, latLng([disaster.location.lat, disaster.location.lon]), disaster.name);
    }
  }

  catch (error) {
    unexpectedError.value = true;
    console.log(error);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
            <img src="../assets/YellowDot.png" alt="fenómenos costeros" width="28" height="28">
            <span class="label-text">Fenomenos costeros</span>
            <input type="checkbox" v-model="checkedCoast" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <img src="../assets/Wind.png" alt="vientos" width="28" height="28">
            <span class="label-text">Vientos</span>
            <input type="checkbox" v-model="checkedWind" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <img src="../assets/Fog.png" alt="nieblas" width="28" height="28">
            <span class="label-text">Niebla</span>
            <input type="checkbox" v-model="checkedFog" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <img src="../assets/Snow.png" alt="nevadas" width="28" height="28">
            <span class="label-text">Nevadas</span>
            <input type="checkbox" v-model="checkedSnow" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <img src="../assets/Storm.png" alt="tormentas" width="28" height="28">
            <span class="label-text">Tormentas</span>
            <input type="checkbox" v-model="checkedStorm" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <img src="../assets/Rain.png" alt="nieblas" width="28" height="28">
            <span class="label-text">Lluvias</span>
            <input type="checkbox" v-model="checkedRain" class="checkbox checkbox-xs" />
          </label>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline btn-wide">Consultar</button>
        </div>
      </form>
    </div>
    <Map class="rounded-lg h-screen mx-5" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>
</template>
