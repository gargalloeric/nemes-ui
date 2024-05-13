<script setup lang="ts">
import L, {geoJSON, LatLng, latLng, LayerGroup, layerGroup, LeafletMouseEvent, Map} from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref} from 'vue';
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

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: selectFeature
  });
}

let windIcon = new L.Icon({
  iconUrl: 'src/assets/Wind.jpg',
  iconSize: [80, 80]
});

let rainIcon = new L.Icon({
  iconUrl: 'src/assets/Rain.png',
  iconSize: [50, 50]
});

let fogIcon = new L.Icon({
  iconUrl: 'src/assets/Fog.png',
  iconSize: [50, 50]
});

let snowIcon = new L.Icon({
  iconUrl: 'src/assets/Snow.jpg',
  iconSize: [50, 50]
});


function setMarker(type: string, coords: L.LatLng, message : string){
  let icon : L.Icon;
  switch (type){
    case "Lluvias":
      icon = rainIcon;
      break;
    case "Nevadas":
      icon = snowIcon;
      break;
    case "Nieblas":
      icon = fogIcon;
      break;
    case "Vientos":
      icon = windIcon;
      break;
  }
  if (icon != null){
    let marker : L.Marker = L.marker(latLng([coords.lat, coords.lng, 0]),{icon: icon}).bindPopup(message);
    if(layerGroup.value){
      marker.openPopup().addTo(layerGroup.value);
    }
  }

}

function setZones(){
  geoJson = L.geoJson(zonesData, {
    onEachFeature: onEachFeature
  }).addTo(map.value);
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

defineExpose({
  setMarker,
  setZones,
  getSelected
});

</script>

<template>
  <div id="map" style="height: 80vh; width: 100%; z-index: 1;"></div>
</template>
