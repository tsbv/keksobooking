const initRangeSlider = () => {
  const sliderNode = document.querySelector('.ad-form__slider');
  const sliderValueNode = document.querySelector('#price');
  const sliderOptions = {
    range: { min: 0, max: 100000 },
    start: 0,
    step: 500,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    }
  };
  noUiSlider.create(sliderNode, sliderOptions);
  sliderValueNode.value = '';
  sliderNode.noUiSlider.on('update', () => {
    const value = Number(sliderNode.noUiSlider.get());
    sliderValueNode.value = value > 0 ? value : '';
  });
  sliderNode.noUiSlider.on('slide', () => { // Проверка активируется только тогда, когда пользователь взаимодействует с ползунком
    const event = new Event('input', { bubbles: true }); // Позволяет событию всплывать для проверки формы
    sliderValueNode.dispatchEvent(event);
  });
};

export { initRangeSlider };
