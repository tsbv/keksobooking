const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const initializeImageUploads = () => {
  const avatarInputNode = document.querySelector('#avatar');
  const imagesInputNode = document.querySelector('#images');
  const avatarPreviewNode = document.querySelector('.ad-form-header__preview img');
  const photoContainerNode = document.querySelector('.ad-form__photo');
  const isValidFile = (file) => {
    const fileName = file.name.toLowerCase();
    return FILE_TYPES.some((type) => fileName.endsWith(type));
  };
  const createImagePreview = (file) => {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.width = '70px';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
    return image;
  };
  avatarInputNode.addEventListener('change', () => {
    const file = avatarInputNode.files[0];
    if (file && isValidFile(file)) {
      avatarPreviewNode.src = URL.createObjectURL(file);
    }
  });
  let uploadedFiles = [];
  imagesInputNode.addEventListener('change', () => {
    const newFiles = Array.from(imagesInputNode.files);
    const validNewFiles = newFiles.filter(isValidFile);
    uploadedFiles = [...uploadedFiles, ...validNewFiles];
    photoContainerNode.innerHTML = '';
    uploadedFiles.forEach((file) => {
      const preview = createImagePreview(file);
      photoContainerNode.appendChild(preview);
    });
  });
};

export { initializeImageUploads };
