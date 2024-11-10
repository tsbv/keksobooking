import { generateAds } from './data.js';
import { setupFormValidation } from './form-validation.js';
import { disablePageInteraction, enablePageInteraction } from './form.js';
import { initRangeSlider } from './range-slider.js';
import { initMap } from './map.js';

generateAds(); // Генерация временных данных
disablePageInteraction(); // Перевод страницы в неактивное состояние
enablePageInteraction(); // Включаем страницу (после загрузки карты):
setupFormValidation(); // Настройка валидации формы
initRangeSlider(); // Ползунок цены
initMap(); // Инициализация карты
