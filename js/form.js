const adFormNode = document.querySelector('.ad-form');
const mapFiltersNode = document.querySelector('.map__filters');
const toggleFormElements = (form, isDisabled) => {
  form.querySelectorAll('input, select, textarea, button, fieldset').forEach((element) => {
    element.disabled = isDisabled;
    return element.disabled;
  });
};
const updateFormsAccessibility  = (isDisabled) => {
  [adFormNode, mapFiltersNode].forEach((form) => {
    form.classList.toggle(`${form.className}--disabled`, isDisabled);
    toggleFormElements(form, isDisabled);
  });
  const sliderNode = document.querySelector('.ad-form__slider');
  if (sliderNode && sliderNode.noUiSlider) {
    sliderNode.toggleAttribute('disabled', isDisabled);
  }
};
const disablePageInteraction  = () => updateFormsAccessibility (true);
/* const enablePageInteraction  = () => updateFormsAccessibility (false); */

export { disablePageInteraction };
