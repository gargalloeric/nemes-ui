<script setup lang="ts">
import Map from "../components/Map.vue";
import {onMounted, ref} from "vue";
import Footer from "../components/Footer.vue";
import {getDisasters, getRecentDisasters} from "../services/ObtainDisasters.ts";
import {Disaster} from "../model/Disaster.ts";
import {EnumDisasters} from "../model/EnumDisasters.ts";
import {latLng} from "leaflet";
import Alert from "../components/Alert.vue";

const initLatLang: L.LatLngExpression = [39.98541896850344, -0.05080976072749943];
const initZoom: number = 13;
const map = ref();


onMounted(async() => {

});



</script>

<template>
  <div class="flex md:flex-row sm:flex-col mt-2">
    <div class="flex flex-col mr-4 ml-4">
    </div>
    <Map class="rounded-lg h-screen" :init-lat-lang="initLatLang" :zoom="initZoom" ref="map"></Map>
  </div>

  <Footer></Footer>
</template>
