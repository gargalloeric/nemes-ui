<script setup lang="ts">
import L, {geoJSON, LatLng, latLng, LayerGroup, layerGroup, LeafletMouseEvent, Map} from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref, toRaw} from 'vue';
import {EnumDisasters} from "../model/EnumDisasters.ts";
import {zonesData} from "../utils/data.ts";
import {Coordinates} from "../model/Coordinates.ts";

const props = defineProps<{
  initLatLang: L.LatLngExpression,
  zoom: number
}>();

const map = ref<Map>();
const layerGroup = ref<LayerGroup>();
let geoJson;

let selected : [] = [];
let images: L.ImageOverlay[] = [];

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

  layerGroup.value = L.layerGroup().addTo(toRaw(map.value));

});

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: selectFeature
  });
}


function setMarker(type: string, coords: L.LatLng, message : string){
  let linkImage: string;
  let latLngBounds = L.latLngBounds([coords, [coords.lat + 0.1, coords.lng + 0.15]]);
  switch(type){

    case "Lluvias":
      linkImage = 'src/assets/Rain.png';
      latLngBounds = L.latLngBounds([[coords.lat -0.05, coords.lng -0.075], [coords.lat +0.05, coords.lng +0.075]]);
      break;
    case "Nevadas":
      linkImage = 'src/assets/Snow.png';
      latLngBounds = L.latLngBounds([[coords.lat + 0.05 , coords.lng -0.075], [coords.lat + 0.15, coords.lng +0.075]]);
      break;
    case "Nieblas":
      linkImage = 'src/assets/Fog.png';
      latLngBounds = L.latLngBounds([[coords.lat -0.05, coords.lng -0.2], [coords.lat +0.05, coords.lng -0.05]]);
      break;
    case "Vientos":
      linkImage = 'src/assets/Wind.png';
      latLngBounds = L.latLngBounds([[coords.lat -0.05, coords.lng +0.05], [coords.lat +0.05, coords.lng +0.2]]);
      break;
    case "Tormentas":
      linkImage = 'src/assets/Storm.png';
      latLngBounds = L.latLngBounds([[coords.lat -0.05, coords.lng -0.075], [coords.lat -0.15, coords.lng +0.075]]);
      break;
  }
  if (linkImage != null && layerGroup.value){
    let imageOverlay = L.imageOverlay(linkImage, latLngBounds, {
      opacity: 1,
      interactive: true
    });
    toRaw(layerGroup.value)?.addLayer(imageOverlay);
    images.push(imageOverlay);
  }

}

function setZones(){
  geoJson = L.geoJson(zonesData, {
    onEachFeature: onEachFeature
  }).addTo(toRaw(map.value));
}

function highlightFeature(e) {
  let layer = e.target;
  let indx = selected.indexOf(e.target.feature.id);
  if (indx <= -1){
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
  layer.bringToFront();
  }
}

function resetHighlight(e) {
  let indx = selected.indexOf(e.target.feature.id);
  if (indx <= -1)
    geoJson.resetStyle(e.target);
}

function selectFeature(e) {
  //map.value.fitBounds(e.target.getBounds());
  let id = e.target.feature.id;

  let indx = selected.indexOf(id);
  if (indx > -1) {
    selected.splice(indx, 1);
    geoJson.resetStyle(e.target);
  }
  else{
    selected.push(id);
    let layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#ffa500',
      dashArray: '',
      fillOpacity: 0.7
    });
    layer.bringToFront();
  }
}

function getSelected(){
  return selected;
}

function clearAll(){
  //for (let e of selected)
  console.log("reset");
  geoJson.resetStyle();
  selected.splice(0, selected.length);
}

function clearMarkers(){
  /*for (let image of images){
    image.remove();
  }*/

  toRaw(layerGroup.value)?.clearLayers();
}

defineExpose({
  setMarker,
  setZones,
  getSelected,
  clearAll,
  clearMarkers
});

</script>

<template>
  <div id="map" style="height: 80vh; width: 100%; z-index: 1;"></div>
</template>
