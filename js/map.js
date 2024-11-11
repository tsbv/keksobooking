const TOKYO_COORDINATES = {
  lat: 35.68235,
  lng: 139.75232
};
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const initMap = (onMapInitialized) => {
  const map = L.map('map-canvas').setView([TOKYO_COORDINATES.lat, TOKYO_COORDINATES.lng], 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map).on('load', onMapInitialized);
  const mainPinMarker = L.marker(
    [TOKYO_COORDINATES.lat, TOKYO_COORDINATES.lng],
    {
      icon: mainPinIcon,
      draggable: true,
    },
  );
  mainPinMarker.addTo(map);
};

export { initMap };
