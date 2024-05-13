<script setup lang="ts">
import Map from "../components/Map.vue";
import { Ref, onMounted, ref } from "vue";
import { saveZoneOfInterest } from "../services/SaveZoneOfInterest.ts";
import { Coordinates } from "../model/Coordinates.ts";

const initLatLang: L.LatLngExpression = [40.415361175393144, -3.701523140526825];
const initZoom: number = 6;
const map = ref();
const notSelected: Ref<boolean> = ref(false);
const checkedCoast: Ref<boolean> = ref(false);
const checkedWind: Ref<boolean> = ref(false);
const checkedSnow: Ref<boolean> = ref(false);
const checkedRain: Ref<boolean> = ref(false);
const checkedStorm: Ref<boolean> = ref(false);
const checkedFog: Ref<boolean> = ref(false);
const isSaved: Ref<boolean> = ref(false);

onMounted(async () => {
  map.value.setZones();
});

async function save() {
  let selected = map.value.getSelected();
  let selected_: Coordinates[] = [];
  for (const cor of selected) {
    const myArray = cor.toString().split(",");
    selected_.push(new Coordinates(myArray[0], myArray[1]));
  }
  let selectedEvents: string[] = [];

  if (selected.length == 0 || !isSomethingSelected()) {
    notSelected.value = true;
    console.log("Not selected true");
  } else {
    notSelected.value = false;
    if (checkedCoast.value) selectedEvents.push("Costeros");
    if (checkedWind.value) selectedEvents.push("Vientos");
    if (checkedSnow.value) selectedEvents.push("Nevadas");
    if (checkedRain.value) selectedEvents.push("Lluvias");
    if (checkedStorm.value) selectedEvents.push("Tormentas");
    if (checkedFog.value) selectedEvents.push("Nieblas");
    const resp = await saveZoneOfInterest(selected_, selectedEvents);

    if (resp.ok) {
      isSaved.value = true;
      setTimeout(() => {
        isSaved.value = false;
        clearCheckboxes();
        map.value.clearAll()
      }, 1000)
    }
  }
}

function clearCheckboxes() {
  checkedCoast.value = false;
  checkedWind.value = false;
  checkedSnow.value = false;
  checkedRain.value = false;
  checkedStorm.value = false;
  checkedFog.value = false;
}


function isSomethingSelected() {
  return checkedCoast.value || checkedWind.value || checkedSnow.value || checkedRain.value || checkedStorm.value || checkedFog.value;
}


</script>

<template>
  <div class="flex md:flex-row sm:flex-col mt-2">
    <div class="flex flex-col mr-4 ml-4">
      <h2 class="text-2xl">Lista de eventos</h2>
      <form @submit.prevent="save">
        <div class="form-control">
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-beach">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
              <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
              <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
              <path d="M15 9l-3 5.196" />
              <path
                d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
            </svg>
            <span class="label-text">Costeros</span>
            <input type="checkbox" v-model="checkedCoast" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-wind">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
              <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
              <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
            </svg>
            <span class="label-text">Vientos</span>
            <input type="checkbox" v-model="checkedWind" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-snowflake">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 4l2 1l2 -1" />
              <path d="M12 2v6.5l3 1.72" />
              <path d="M17.928 6.268l.134 2.232l1.866 1.232" />
              <path d="M20.66 7l-5.629 3.25l.01 3.458" />
              <path d="M19.928 14.268l-1.866 1.232l-.134 2.232" />
              <path d="M20.66 17l-5.629 -3.25l-2.99 1.738" />
              <path d="M14 20l-2 -1l-2 1" />
              <path d="M12 22v-6.5l-3 -1.72" />
              <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" />
              <path d="M3.34 17l5.629 -3.25l-.01 -3.458" />
              <path d="M4.072 9.732l1.866 -1.232l.134 -2.232" />
              <path d="M3.34 7l5.629 3.25l2.99 -1.738" />
            </svg>
            <span class="label-text">Nevadas</span>
            <input type="checkbox" v-model="checkedSnow" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-umbrella">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 12a8 8 0 0 1 16 0z" />
              <path d="M12 12v6a2 2 0 0 0 4 0" />
            </svg>
            <span class="label-text">Lluvias</span>
            <input type="checkbox" v-model="checkedRain" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-storm">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
              <path d="M13 14l-2 4l3 0l-2 4" />
            </svg>
            <span class="label-text">Tormentas</span>
            <input type="checkbox" v-model="checkedStorm" class="checkbox checkbox-xs" />
          </label>
          <label class="label cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-mist">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 5h3m4 0h9" />
              <path d="M3 10h11m4 0h1" />
              <path d="M5 15h5m4 0h7" />
              <path d="M3 20h9m4 0h3" />
            </svg>
            <span class="label-text">Nieblas</span>
            <input type="checkbox" v-model="checkedFog" class="checkbox checkbox-xs" />
          </label>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline btn-wide" :class="{ 'btn-success': isSaved }">
            <span v-if="!isSaved">Guardar</span>
            <span v-if="isSaved">Guardado</span>
          </button>
        </div>
      </form>
      <p v-if="notSelected" class="mt-4 text-red-500">Selecciona evento y zona en el mapa.</p>
    </div>
    <Map class="rounded-lg h-screen mx-5" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

</template>
