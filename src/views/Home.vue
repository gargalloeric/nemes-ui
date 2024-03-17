<script setup lang="ts">
import Map from "../components/Map.vue";
import {ref} from "vue";

const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 13;
const map = ref();
</script>

<template>
  <div></div>
  <div class="flex md:flex-row sm:flex-col">
    <Map class="rounded-lg" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>
</template>
