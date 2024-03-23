<script setup lang="ts">
import Map from "../components/Map.vue";
import {ref} from "vue";

const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 13;
const map = ref();
</script>

<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">Rango temporal</span>
      <span class="label-text-alt">Fecha Inicio</span>
    </div>
    <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
    <div class="label">
      <span class="label-text-alt">Bottom Left label</span>
      <span class="label-text-alt">Bottom Right label</span>
    </div>
  </label>
  <div class="flex md:flex-row sm:flex-col">
    <Map class="rounded-lg h-screen" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>
</template>
