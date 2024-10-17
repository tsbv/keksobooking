import { generateAds } from './data.js';
import { createCardElement, renderCard } from './ad-generator.js';

const ads = generateAds(); // Генерация временных данных
if (ads.length) {
  renderCard(ads[0]); // Создаем и отображаем первое объявление
  ads.forEach(createCardElement);
}
