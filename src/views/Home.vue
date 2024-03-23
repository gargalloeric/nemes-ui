<script setup lang="ts">
import Map from "../components/Map.vue";
import {ref} from "vue";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 13;
const map = ref();

let lastDate : Date;
let initialDate : Date;
let checkedFire : boolean = true;
let checkedMeteo : boolean = true;
let checkedOthers : boolean = true;




function query(){
//TODO
}

</script>

<template>
  <NavBar></NavBar>
  <div class="flex md:flex-row sm:flex-col">
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
    <Map class="rounded-lg h-screen" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

  <Footer></Footer>
</template>
