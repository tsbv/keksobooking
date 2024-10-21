const setupFormValidation = () => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MIN_PRICE = 1;
  const MAX_PRICE = 100000;
  const formNode = document.querySelector('.ad-form');
  const pristine = new Pristine(formNode, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  });
  const titleInput = formNode.querySelector('#title'); // Валидация заголовка
  const validateTitle = (value) => {
    if (value.trim() === '') {
      return false;
    }
    return value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
  };
  const getTitleErrorMessage = (value) => {
    if (value.trim() === '') {
      return 'Введите заголовок.';
    }
    return `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов.`;
  };
  pristine.addValidator(
    titleInput,
    validateTitle,
    getTitleErrorMessage
  );
  const priceInput = formNode.querySelector('#price'); // Валидация цены
  const validatePrice = (value) => {
    if (value.trim() === '') {
      return false;
    }
    const price = parseFloat(value);
    return !isNaN(price) && price > MIN_PRICE && price <= MAX_PRICE;
  };
  const getPriceErrorMessage = (value) => {
    if (value.trim() === '') {
      return 'Введите цену за ночь.';
    }
    return `От ${MIN_PRICE} до ${MAX_PRICE} рублей.`;
  };
  pristine.addValidator(
    priceInput,
    validatePrice,
    getPriceErrorMessage
  );
  formNode.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      formNode.submit();
    }
  });
};

export { setupFormValidation };
