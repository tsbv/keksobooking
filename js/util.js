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
  if (![from, to, decimalPlaces].every((arg) => typeof arg === 'number')) { // Проверяем, что все аргументы являются числами
    throw new TypeError('Все аргументы должны быть числами.');
  }
  if (from < 0 || to < 0 || decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) { // Проверяем, являются ли какие-либо значения отрицательными или decimalPlaces не является целым числом
    throw new RangeError('Значения должны быть неотрицательными, а десятичные знаки должны быть целыми числами.');
  }
  if (to <= from) { // Если «до» меньше или равно «от», вернуть значение «от», округленное до указанного количества десятичных знаков
    return Number(from.toFixed(decimalPlaces));
  }
  return Number((Math.random() * (to - from) + from).toFixed(decimalPlaces)); // Генерируем случайное число с плавающей точкой между «от» и «до», округляем до указанного количества знаков после запятой
};

export { getRandomInteger, getRandomFloat };
