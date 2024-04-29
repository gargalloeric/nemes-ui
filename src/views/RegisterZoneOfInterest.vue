<script setup lang="ts">
import Map from "../components/Map.vue";
import {onMounted, ref} from "vue";
import Footer from "../components/Footer.vue";
import {saveZoneOfInterest} from "../services/SaveZoneOfInterest.ts";

const initLatLang: L.LatLngExpression = [40.415361175393144, -3.701523140526825];
const initZoom: number = 6;
const map = ref();
let NotSelected : boolean = false;

onMounted(async() => {
  map.value.setZones();
});

function save(){
  let selected = map.value.getSelected();
  if (selected.length == 0) {
    NotSelected = true;
  }
  else {
    saveZoneOfInterest(selected);
  }
}


</script>

<template>
  <div class="flex md:flex-row sm:flex-col mt-2">
    <div class="flex flex-col mr-4 ml-4">
      <form @submit.prevent="save">
        <h2 class="text-2xl">Seleccionar zona de interés</h2>
        <div class="text-center mt-4">
          <button class="btn btn-outline">Guardar</button>
        </div>

        <div class="form-control">
          <h2 class="text-2xl">Lista de catastrofes</h2>
          <!--<label class="label cursor-pointer">
            <span class="label-text">Costeros</span>
            <input type="checkbox" v-model="checkedMeteo" class="checkbox checkbox-info" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Vientos</span>
            <input type="checkbox" v-model="checkedFire" class="checkbox checkbox-error" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Nevadas</span>
            <input type="checkbox" v-model="checkedOthers" class="checkbox checkbox-warning" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Lluvias</span>
            <input type="checkbox" v-model="checkedMeteo" class="checkbox checkbox-info" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Tormentas</span>
            <input type="checkbox" v-model="checkedFire" class="checkbox checkbox-error" />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Nieblas</span>
            <input type="checkbox" v-model="checkedOthers" class="checkbox checkbox-warning" />
          </label>!-->
        </div>
      </form>

    </div>
    <div class="flex flex-col mr-4 ml-4">
    </div>
    <Map class="rounded-lg h-screen" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

  <Footer></Footer>
</template>
