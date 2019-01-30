const inputUpload = document.getElementById('download');
const inputDownload = document.querySelector('.search-field');
const btnDownload = document.querySelector('.btn-download');
const uploadLabel = document.querySelector('.download-icon span');
const btnUpload = document.querySelector('.btn-upload');


function changeStatusBtn(elem, btn) {
  elem.addEventListener('input', function() {
    if (elem.value !== '') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
}

function changeInputFileValue(elem, titleValue) {
  elem.addEventListener('change', function() {
    if (elem.value !== '') {
      titleValue.innerHTML = elem.value.replace(/.*\\/, '');
    } else {
      titleValue.innerHTML = 'Choose your file';
    }
  });
}

changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inputDownload, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);