<script setup lang="ts">
import L, {geoJSON, latLng, LayerGroup, layerGroup, LeafletMouseEvent, Map} from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
import {EnumDisasters} from "../model/EnumDisasters.ts";

const props = defineProps<{
  initLatLang: L.LatLngExpression,
  zoom: number
}>();

const map = ref<Map>();
const layerGroup = ref<LayerGroup>();

onMounted(() => {
   map.value = L.map("map", {
    center: props.initLatLang,
    zoom: props.zoom
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map.value);

  layerGroup.value = L.layerGroup().addTo(map.value);

});

let fireIcon = new L.Icon({
  iconUrl: 'src/assets/FireIcon.png',
  iconSize: [80, 80]
});

let cloudIcon = new L.Icon({
  iconUrl: 'src/assets/Cloud.png',
  iconSize: [50, 50]
});

let yellowIcon = new L.Icon({
  iconUrl: 'src/assets/YellowDot.png',
  iconSize: [50, 50]
});


function setMarker(type: EnumDisasters, coords: L.LatLng, message : string){
  let icon : L.Icon;
  /*switch (type){
    case EnumDisasters.Fire:
      icon = fireIcon;
      break;
    case EnumDisasters.Meteorological:
      icon = cloudIcon;
      break;
    case EnumDisasters.Other:
      icon = yellowIcon;
      break;
  }*/
  icon = cloudIcon
  let marker : L.Marker = L.marker(latLng([coords.lat, coords.lng, 0]),{icon: icon}).bindPopup(message);
  if(layerGroup.value){
    marker.openPopup().addTo(layerGroup.value);
    console.log("holas")
  }

}

defineExpose({
  setMarker
});

</script>

<template>
  <div id="map" style="height: 80vh; width: 100%; z-index: 1;"></div>
</template>
