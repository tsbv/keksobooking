import { getRandomInteger, getRandomFloat } from './util.js';
import { generateAds } from './data.js';

getRandomInteger(0, 1); // Результат: целое число из диапазона "от...до"
getRandomFloat(1, 2, 3); // Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
generateAds(); // Генерация временных данных
