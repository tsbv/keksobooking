import { getRandomInteger, getRandomFloat } from './util.js';

getRandomInteger(0, 1); // Результат: целое число из диапазона "от...до"
getRandomFloat(1, 2, 3); // Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const generateAuthor = (usedAvatars) => {
  let avatarNumber;
  do {
    avatarNumber = getRandomInteger(1, 10).toString().padStart(2, '0');
  } while (usedAvatars.has(avatarNumber));
  usedAvatars.add(avatarNumber);
  return { avatar: `img/avatars/user${avatarNumber}.png` };
};
const generateOffer = () => {
  const titles = [
    'Уютная квартира в центре города',
    'Просторный дом с садом',
    'Современная студия рядом с пляжем',
    'Загородный дом в лесу',
    'Роскошный пентхаус с видом'
  ];
  const descriptions = [
    'Этот очаровательный отель предлагает идеальное сочетание комфорта и стиля, идеально подходящее как для краткосрочного, так и для длительного проживания.',
    'Наслаждайтесь спокойствием природы в этом хорошо оборудованном отеле с современными удобствами и живописными окрестностями.',
    'Почувствуйте лучшую городскую жизнь в этом центральном месте с легким доступом к местным достопримечательностям и общественному транспорту.',
    'Отдохните в этом тихом уединенном месте с панорамным видом и множеством роскошных удобств, чтобы сделать отдых поистине незабываемым.',
    'Откройте для себя идеальный баланс уединения и удобств в этом тщательно спроектированном доме, подходящем для семей или групп'
  ];
  const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const times = ['12:00', '13:00', '14:00'];
  const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const allPhotos = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];
  const lat = getRandomFloat(35.65, 35.7, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);
  const features = [...allFeatures].sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(0, allFeatures.length));
  const photos = [...allPhotos].sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(1, allPhotos.length));
  return {
    title: getRandomElement(titles),
    description: getRandomElement(descriptions),
    address: `${lat}, ${lng}`,
    price: getRandomInteger(1000, 10000),
    type: getRandomElement(types),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 10),
    checkin: getRandomElement(times),
    checkout: getRandomElement(times),
    features,
    photos
  };
};
const generateAd = (usedAvatars) => {
  const offer = generateOffer();
  const [lat, lng] = offer.address.split(',').map((coord) => parseFloat(coord.trim()));
  return {
    author: generateAuthor(usedAvatars),
    offer,
    location: { lat, lng }
  };
};
const generateAdArray = (count) => {
  const usedAvatars = new Set();
  return Array.from({ length: count }, () => generateAd(usedAvatars));
};
generateAdArray(10); // Генерируем массив из 10 рекламных объектов
