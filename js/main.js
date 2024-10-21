import { generateAds } from './data.js';
import { createCardElement, renderCard } from './ad-generator.js';
import { setupFormValidation } from './form-validation.js';
import { disablePageInteraction, enablePageInteraction } from './form.js';

const ads = generateAds(); // Генерация временных данных
if (ads.length) {
  renderCard(ads[0]); // Создаем и отображаем первое объявление
  ads.forEach(createCardElement);
}
disablePageInteraction(); // Перевод страницы в неактивное состояние
enablePageInteraction(); // Включаем страницу (после загрузки карты):
setupFormValidation();
