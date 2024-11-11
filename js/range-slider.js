const initRangeSlider = () => {
  const sliderNode = document.querySelector('.ad-form__slider');
  const sliderValueNode = document.querySelector('#price');
  if (sliderNode.noUiSlider) {
    return;
  }
  noUiSlider.create(sliderNode, {
    range: { min: 0, max: 100000 },
    start: 0,
    step: 500,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    }
  });
  const slider = sliderNode.noUiSlider;
  sliderValueNode.value = '';
  slider.on('update', () => {
    sliderValueNode.value = Number(slider.get()) || '';
  });
  slider.on('slide', () => {
    sliderValueNode.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

export { initRangeSlider };
