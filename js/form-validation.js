import { INITIAL_COORDINATES } from './map.js';

const setupFormValidation = () => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 100000;
  const MinPriceByType = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000
  };
  const formNode = document.querySelector('.ad-form');
  const timeInSelectNode = formNode.querySelector('#timein');
  const timeOutSelectNode = formNode.querySelector('#timeout');
  const titleInputNode = formNode.querySelector('#title');
  const priceInputNode = formNode.querySelector('#price');
  const typeSelectNode = formNode.querySelector('#type');
  const roomNumberSelectNode = formNode.querySelector('#room_number');
  const capacitySelectNode = formNode.querySelector('#capacity');
  const addressInputNode = formNode.querySelector('#address');
  const setInitialAddress = () => { // Начальные координаты в поле адреса
    const { lat, lng } = INITIAL_COORDINATES;
    addressInputNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  };
  const updateAddress = (marker) => { // Обновление адреса при перетаскивании маркера
    const position = marker.getLatLng();
    addressInputNode.value = `${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`;
  };
  const pristine = new Pristine(formNode, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  });
  const syncTimes = (sourceSelect, targetSelect) => { // Синхронизация времени заезда и выезда
    const selectedIndex = sourceSelect.selectedIndex;
    targetSelect.selectedIndex = selectedIndex;
  };
  timeInSelectNode.addEventListener('change', () => {
    syncTimes(timeInSelectNode, timeOutSelectNode);
  });
  timeOutSelectNode.addEventListener('change', () => {
    syncTimes(timeOutSelectNode, timeInSelectNode);
  });
  const validateTitle = (value) => { // Валидация заголовка
    if (value.trim() === '') {
      return false;
    }
    return value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
  };
  const getTitleErrorMessage = (value) => {
    if (value.trim() === '') {
      return 'Введите заголовок.';
    }
    return `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов.`;
  };
  pristine.addValidator(
    titleInputNode,
    validateTitle,
    getTitleErrorMessage
  );
  const validatePrice = (value) => { // Валидация цены
    if (value.trim() === '') {
      return false;
    }
    const price = parseFloat(value);
    const minPrice = MinPriceByType[typeSelectNode.value];
    return !isNaN(price) && price >= minPrice && price <= MAX_PRICE;
  };
  const getPriceErrorMessage = (value) => {
    if (value.trim() === '') {
      return 'Введите цену за ночь.';
    }
    const minPrice = MinPriceByType[typeSelectNode.value];
    return `От ${minPrice} до ${MAX_PRICE} рублей.`;
  };
  pristine.addValidator(
    priceInputNode,
    validatePrice,
    getPriceErrorMessage
  );
  const updatePriceAttributes = () => {
    const minPrice = MinPriceByType[typeSelectNode.value];
    priceInputNode.placeholder = minPrice.toString();
    if (priceInputNode.value.trim() !== '') { // Проверка только в том случае, если во входных данных есть значение
      pristine.validate(priceInputNode);
    }
  };
  typeSelectNode.addEventListener('change', updatePriceAttributes);
  updatePriceAttributes(); // Первоначальная настройка атрибутов цен
  const roomGuestLimitations = { // Валидация количества комнат и гостей
    '1': {
      allowedGuests: ['1']
    },
    '2': {
      allowedGuests: ['1', '2']
    },
    '3': {
      allowedGuests: ['1', '2', '3']
    },
    '100': {
      allowedGuests: ['0']
    }
  };
  const capacityMessages = {
    '1': '1 комната только для 1 гостя.',
    '2': '2 комнаты только для 1-2 гостей.',
    '3': '3 комнаты для 1-3 гостей.',
    '100': '100 комнат не для гостей.',
    'default': 'Выберите количество комнат.'
  };
  pristine.addValidator(
    capacitySelectNode,
    (capacity) => roomGuestLimitations[roomNumberSelectNode.value].allowedGuests.includes(capacity),
    () => capacityMessages[roomNumberSelectNode.value] || capacityMessages.default
  );
  roomNumberSelectNode.addEventListener('change', () => pristine.validate(capacitySelectNode));
  formNode.addEventListener('submit', (event) => { // Отправка формы
    event.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      formNode.submit();
    }
  });
  setInitialAddress(); // Установка начального адреса при загрузке страницы
  return {
    updateAddress,
    setInitialAddress
  };
};

export { setupFormValidation };
