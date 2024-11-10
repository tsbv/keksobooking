const initMap = () => {
  const mapNode = L.map('map-canvas')
    .setView({
      lat: 35.6762,
      lng: 139.6503,
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapNode);
};

export { initMap };
