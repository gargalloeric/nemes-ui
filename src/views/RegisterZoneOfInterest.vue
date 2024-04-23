<script setup lang="ts">
import Map from "../components/Map.vue";
import {onMounted, ref} from "vue";
import Footer from "../components/Footer.vue";

const initLatLang: L.LatLngExpression = [40.415361175393144, -3.701523140526825];
const initZoom: number = 6;
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
