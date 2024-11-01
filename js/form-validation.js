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
  const pristine = new Pristine(formNode, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  });
  const titleInput = formNode.querySelector('#title'); // Валидация заголовка
  const validateTitle = (value) => {
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
    titleInput,
    validateTitle,
    getTitleErrorMessage
  );
  const priceInput = formNode.querySelector('#price'); // Валидация цены
  const typeSelect = formNode.querySelector('#type');
  const validatePrice = (value) => {
    if (value.trim() === '') {
      return false;
    }
    const price = parseFloat(value);
    const minPrice = MinPriceByType[typeSelect.value];
    return !isNaN(price) && price >= minPrice && price <= MAX_PRICE;
  };
  const getPriceErrorMessage = (value) => {
    if (value.trim() === '') {
      return 'Введите цену за ночь.';
    }
    const minPrice = MinPriceByType[typeSelect.value];
    return `От ${minPrice} до ${MAX_PRICE} рублей.`;
  };
  pristine.addValidator(
    priceInput,
    validatePrice,
    getPriceErrorMessage
  );
  const updatePriceAttributes = () => {
    const minPrice = MinPriceByType[typeSelect.value];
    priceInput.placeholder = minPrice.toString();
    priceInput.min = minPrice;
    if (priceInput.value.trim() !== '') { // Проверка только в том случае, если во входных данных есть значение
      pristine.validate(priceInput);
    }
  };
  typeSelect.addEventListener('change', updatePriceAttributes);
  updatePriceAttributes(); // Первоначальная настройка атрибутов цен
  formNode.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      formNode.submit();
    }
  });
  const roomNumberSelect = formNode.querySelector('#room_number'); // Валидация полей количество комнат и количество мест
  const capacitySelect = formNode.querySelector('#capacity');
  const roomGuestLimitations = {
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
    capacitySelect,
    (capacity) => roomGuestLimitations[roomNumberSelect.value].allowedGuests.includes(capacity),
    () => capacityMessages[roomNumberSelect.value] || capacityMessages.default
  );
  roomNumberSelect.addEventListener('change', () => pristine.validate(capacitySelect));
};

export { setupFormValidation };
