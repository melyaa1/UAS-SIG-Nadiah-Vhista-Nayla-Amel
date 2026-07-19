// =====================================
// Inisialisasi Peta
// =====================================

const map = L.map('map').setView([-6.167, 106.758], 12);

// =====================================
// Basemap OpenStreetMap
// =====================================

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// =====================================
// Layer Group
// =====================================

const rumahSakitLayer = L.layerGroup().addTo(map);
const klinikLayer = L.layerGroup().addTo(map);
const apotekLayer = L.layerGroup().addTo(map);

// =====================================
// Icon
// =====================================

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25,41],
    iconAnchor:[12,41]
});

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:[25,41],
    iconAnchor:[12,41]
});

const greenIcon = new L.Icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize:[25,41],
    iconAnchor:[12,41]
});

// =====================================
// Data Contoh
// =====================================

const rumahSakit = [

{
nama:"RSUD Cengkareng",
lat:-6.143,
lng:106.738
},

{
nama:"RS Hermina Daan Mogot",
lat:-6.158,
lng:106.761
},

{
nama:"RS Royal Taruma",
lat:-6.171,
lng:106.783
}

];

const klinik = [

{
nama:"Klinik Sehat Medika",
lat:-6.180,
lng:106.760
},

{
nama:"Klinik Medika Jaya",
lat:-6.165,
lng:106.745
},

{
nama:"Klinik Harapan",
lat:-6.154,
lng:106.781
}

];

const apotek = [

{
nama:"Apotek K24",
lat:-6.169,
lng:106.772
},

{
nama:"Apotek Kimia Farma",
lat:-6.174,
lng:106.754
},

{
nama:"Apotek Guardian",
lat:-6.150,
lng:106.770
}

];

// =====================================
// Marker Rumah Sakit
// =====================================

rumahSakit.forEach(rs=>{

L.marker([rs.lat,rs.lng],{icon:redIcon})
.addTo(rumahSakitLayer)
.bindPopup(`
<b>${rs.nama}</b><br>
Kategori : Rumah Sakit
`);

});

// =====================================
// Marker Klinik
// =====================================

klinik.forEach(item=>{

L.marker([item.lat,item.lng],{icon:blueIcon})
.addTo(klinikLayer)
.bindPopup(`
<b>${item.nama}</b><br>
Kategori : Klinik
`);

});

// =====================================
// Marker Apotek
// =====================================

apotek.forEach(item=>{

L.marker([item.lat,item.lng],{icon:greenIcon})
.addTo(apotekLayer)
.bindPopup(`
<b>${item.nama}</b><br>
Kategori : Apotek
`);

});

// =====================================
// Layer Control
// =====================================

L.control.layers(
{},
{
"Rumah Sakit":rumahSakitLayer,
"Klinik":klinikLayer,
"Apotek":apotekLayer
}
).addTo(map);

// =====================================
// Tombol Dashboard
// =====================================

const tombol = document.querySelectorAll(".button-group button");

tombol.forEach(btn=>{

btn.addEventListener("click",()=>{

const nama = btn.innerText;

if(nama==="Filter"){
    alert("Menu Filter akan tersedia pada halaman Filter.");
}

if(nama==="Statistik"){
    window.location.href="statistik.html";
}

if(nama==="Layer"){
    alert("Gunakan panel Layer di pojok kanan atas peta.");
}

});

});

// =====================================
// Search
// =====================================

const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keyup",function(){

const keyword = this.value.toLowerCase();

map.eachLayer(function(layer){

if(layer instanceof L.Marker){

const popup = layer.getPopup();

if(!popup) return;

const text = popup.getContent().toLowerCase();

if(text.includes(keyword)){

layer.openPopup();

}

}

});

});