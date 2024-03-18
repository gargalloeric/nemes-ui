<script setup lang="ts">
import L, {geoJSON, latLng, LayerGroup, layerGroup, LeafletMouseEvent, Map} from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';

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
  map.value.on('click', onMapClick);

});

let fireIcon = new L.Icon({
  iconUrl: 'src/assets/FireIcon.png',
  iconSize: [100, 100],
  //iconAnchor: [100, 100],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


let fireMarker = L.marker(latLng([0, 0, 0]),{icon: fireIcon}).bindPopup("Incendio");

function setMarker(marker : L.Marker, coords: L.LatLng){
  if(layerGroup.value)
    marker.openPopup().setLatLng(coords).addTo(layerGroup.value);

}
function onMapClick(){
  setMarker(fireMarker, latLng([39.98541896850344, -0.05080976072749943]));
}





</script>

<template>
  <div id="map" style="height: 80vh; width: 100%;"></div>
</template>
