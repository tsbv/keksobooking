const initMap = (onMapInitialized) => {
  const map = L.map('map-canvas').setView([35.6762, 139.6503], 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map).on('load', onMapInitialized);
};

export { initMap };
