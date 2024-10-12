const getRandomInteger = (from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number') { // Убеждаемся, что оба аргумента числа
    throw new TypeError('Both arguments must be numbers');
  }
  from = Math.max(0, Math.floor(from)); // Преобразовываем в неотрицательные целые числа
  to = Math.max(0, Math.floor(to));
  if (to <= from) { // Обрабатываем случаи, когда «to» меньше или равно «from»
    return from;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export { getRandomInteger };
