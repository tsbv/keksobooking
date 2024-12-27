import { generateAds } from './data.js';
import { setupFormValidation } from './form-validation.js';

const INITIAL_COORDINATES = {
  lat: 35.68235,
  lng: 139.75232
};
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const regularPinIcon = L.icon({ // Создаем метки объявлений, «обычные»
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng
    },
    {
      icon: regularPinIcon
    }
  );
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const avatar = cardElement.querySelector('.popup__avatar'); // Заполняем данные, скрывая элементы, если данные отсутствуют
  if (ad.author.avatar) {
    avatar.src = ad.author.avatar;
  } else {
    avatar.remove();
  }
  const title = cardElement.querySelector('.popup__title');
  if (ad.offer.title) {
    title.textContent = ad.offer.title;
  } else {
    title.remove();
  }
  const address = cardElement.querySelector('.popup__text--address');
  if (ad.offer.address) {
    address.textContent = ad.offer.address;
  } else {
    address.remove();
  }
  const price = cardElement.querySelector('.popup__text--price');
  if (ad.offer.price) {
    price.textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    price.remove();
  }
  const type = cardElement.querySelector('.popup__type');
  if (ad.offer.type) {
    type.textContent = ad.offer.type;
  } else {
    type.remove();
  }
  const capacity = cardElement.querySelector('.popup__text--capacity');
  if (ad.offer.rooms && ad.offer.guests) {
    capacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    capacity.remove();
  }
  const time = cardElement.querySelector('.popup__text--time');
  if (ad.offer.checkin && ad.offer.checkout) {
    time.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    time.remove();
  }
  const featuresContainer = cardElement.querySelector('.popup__features');
  if (ad.offer.features && ad.offer.features.length) {
    featuresContainer.innerHTML = '';
    ad.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresContainer.appendChild(featureElement);
    });
  } else {
    featuresContainer.remove();
  }
  const description = cardElement.querySelector('.popup__description');
  if (ad.offer.description) {
    description.textContent = ad.offer.description;
  } else {
    description.remove();
  }
  const photosContainer = cardElement.querySelector('.popup__photos');
  if (ad.offer.photos && ad.offer.photos.length) {
    const photoTemplate = photosContainer.querySelector('.popup__photo');
    photosContainer.innerHTML = '';
    ad.offer.photos.forEach((photoSrc) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photoSrc;
      photosContainer.appendChild(photoElement);
    });
  } else {
    photosContainer.remove();
  }
  marker.bindPopup(cardElement);
  return marker;
};
const initMap = (onMapInitialized) => {
  const map = L.map('map-canvas').setView([INITIAL_COORDINATES.lat, INITIAL_COORDINATES.lng], 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map).on('load', onMapInitialized);
  const mainPinMarker = L.marker(
    [INITIAL_COORDINATES.lat, INITIAL_COORDINATES.lng],
    {
      icon: mainPinIcon,
      draggable: true,
    },
  );
  const formValidation = setupFormValidation();
  mainPinMarker.on('drag', () => {
    formValidation.updateAddress(mainPinMarker);
  });
  mainPinMarker.addTo(map);
  const markerGroup = L.layerGroup().addTo(map); // Создаем группу слоев для маркеров
  const ads = generateAds(); // Генерируем ads и добавляем маркеры на карту
  ads.forEach((ad) => {
    const marker = createMarker(ad);
    markerGroup.addLayer(marker);
  });
  return {
    map,
    markerGroup
  };
};

export { initMap, INITIAL_COORDINATES };
