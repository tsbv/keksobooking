const typeMap = { // Типы жилья
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const createElement = (tag, className, content = '') => { // Создаем новый HTML элемент с заданными параметрами
  const element = document.createElement(tag);
  element.className = className;
  if (content) {
    element.textContent = content;
  }
  return element;
};
const createCardElement = (ad) => { // Создаем элемент карточки объявления
  const cardElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const handleContent = (selector, content, isAttribute = false) => { // Обрабатываем содержимое элемента карточки
    const element = cardElement.querySelector(selector);
    if (content) {
      if (isAttribute) {
        element.src = content;
      } else {
        element.textContent = content;
      }
    } else {
      element.remove();
    }
  };
  handleContent('.popup__title', ad.offer.title); // Заполняем карточку данными
  handleContent('.popup__text--address', ad.offer.address);
  handleContent('.popup__text--price', ad.offer.price ? `${ad.offer.price} ₽/ночь` : null);
  handleContent('.popup__type', ad.offer.type ? typeMap[ad.offer.type] : null);
  handleContent('.popup__text--capacity', ad.offer.rooms && ad.offer.guests ? `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей` : null);
  handleContent('.popup__text--time', ad.offer.checkin && ad.offer.checkout ? `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` : null);
  handleContent('.popup__description', ad.offer.description);
  handleContent('.popup__avatar', ad.author.avatar, true);
  const createContainer = (selector, items, createFunc) => { // Создаем контейнер с элементами
    const container = cardElement.querySelector(selector);
    if (items && items.length) {
      container.innerHTML = '';
      items.forEach((item) => container.appendChild(createFunc(item)));
    } else {
      container.remove();
    }
  };
  createContainer('.popup__features', ad.offer.features, (feature) => createElement('li', `popup__feature popup__feature--${feature}`)); // Создаем контейнеры для удобств и фотографий
  createContainer('.popup__photos', ad.offer.photos, (photoSrc) => {
    const photo = createElement('img', 'popup__photo');
    photo.src = photoSrc;
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    return photo;
  });
  return cardElement;
};
const renderCard = (ad) => { // Отрисовываем карточку объявления на странице
  document.querySelector('#map-canvas').appendChild(createCardElement(ad));
};
export { createCardElement, renderCard };
