(function() {
  function showImgOnPage(data, elImgWrap) {
    const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
    elImgWrap.querySelector('img').src = imgSrc;
    elImgWrap.classList.add('active');
  }

  function savedFile(data) {
    const downloadURL = URL.createObjectURL(data, { type: data.type });
    const fileLink = document.createElement('a');
    fileLink.href = downloadURL;
    fileLink.download = data.type;
    fileLink.click();
  }

  function changeStatusBtn(elem, btn) {
    elem.addEventListener('change', function() {
      if (elem.value !== '') {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  }

  function changeInputFileValue(elem, titleValue) {
    elem.addEventListener('input', function() {
      if (elem.value !== '') {
        titleValue.innerHTML = elem.value.replace(/.*\\/, '');
      } else {
        titleValue.innerHTML = 'Choose your file';
      }
    });
  }

  window.utils = {
    showImgOnPage,
    savedFile,
    changeStatusBtn,
    changeInputFileValue
  };
}());