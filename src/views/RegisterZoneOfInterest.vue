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
            <span class="label-text">Costeros</span>
            <input type="checkbox" v-model="checkedCoast" class="checkbox" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Vientos</span>
            <input type="checkbox" v-model="checkedWind" class="checkbox" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Nevadas</span>
            <input type="checkbox" v-model="checkedSnow" class="checkbox" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Lluvias</span>
            <input type="checkbox" v-model="checkedRain" class="checkbox" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Tormentas</span>
            <input type="checkbox" v-model="checkedStorm" class="checkbox" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Nieblas</span>
            <input type="checkbox" v-model="checkedFog" class="checkbox" />
          </label>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline" :class="{ 'btn-success': isSaved }">
            <span v-if="!isSaved">Guardar</span>
            <span v-if="isSaved">Guardado</span>
          </button>
        </div>
      </form>
      <p v-if="notSelected" class="mt-4 text-red-500"> Selecciona evento y zona en el mapa.</p>
    </div>
    <div class="flex flex-col mr-4 ml-4">
    </div>
    <Map class="rounded-lg h-screen" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

</template>
