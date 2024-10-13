const getRandomInteger = (from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number') { // Убеждаемся, что оба аргумента числа
    throw new TypeError('Оба аргумента должны быть числами.');
  }
  from = Math.max(0, Math.floor(from)); // Преобразовываем в неотрицательные целые числа
  to = Math.max(0, Math.floor(to));
  if (to <= from) { // Обрабатываем случаи, когда «to» меньше или равно «from»
    return from;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
const getRandomFloat = (from, to, decimalPlaces) => {
  if (![from, to, decimalPlaces].every((arg) => typeof arg === 'number')) { // Проверка типов входных данных
    throw new TypeError('Все аргументы должны быть числами.');
  }
  if (from < 0 || to < 0) { // Убеждаемся, что значения неотрицательны
    throw new RangeError('Значения «от» и «до» должны быть неотрицательными.');
  }
  if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) { // Убеждаемся, что десятичные знаки являются неотрицательным целым числом.
    throw new RangeError('Десятичные знаки должны быть неотрицательными целыми числами.');
  }
  if (to <= from) { // Обработка случая, когда «to» меньше или равно «from»
    return Number(from.toFixed(decimalPlaces));
  }
  const randomFloat = Math.random() * (to - from) + from; // Генерация числа с плавающей точкой
  return Number(randomFloat.toFixed(decimalPlaces)); // Округляем до указанных десятичных знаков
};

export { getRandomInteger, getRandomFloat };
