/* global  HttpRequest */
const inputUpload = document.querySelector('.upload-input');
const inputDownload = document.querySelector('.search-field');
const btnDownload = document.querySelector('.btn-download');
const uploadLabel = document.querySelector('.download-icon span');
const btnUpload = document.querySelector('.btn-upload');
const listBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
const listContainer = document.querySelector('.download-list');
const imgWrapper = document.querySelector('.download-img-wrap');

const myFileList = new FileList(listContainer);
myFileList.clickListener(inputDownload, () => (btnDownload.disabled = false));

function showAndHiddenList(elem) {
  elem.addEventListener('click', function() {
    listWrapper.classList.toggle('active');
  });
}

function showImgOnPage(data) {
  const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
  document.getElementById('download-img').src = imgSrc;
  imgWrapper.classList.add('active');
}

imgWrapper.querySelector('span').addEventListener('click', function() {
  imgWrapper.classList.remove('active');
});

document.querySelector('.upload-form').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { downloadLine: window.onUploadProgress, data: form });
  document.querySelector('.btn-upload').disabled = true;
  myFileList.init();
};

function savedFile(data) {
  const downloadURL = URL.createObjectURL(data, { type: data.type });
  const fileLink = document.createElement('a');

  document.body.appendChild(fileLink);
  fileLink.style.display = 'none';
  fileLink.href = downloadURL;
  fileLink.download = data.type;
  fileLink.click();
  document.body.removeChild(fileLink);
}

document.querySelector('.download-form').onsubmit = function(e) {
  e.preventDefault();
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.get(`/files/${e.target[0].value}`, { downloadLine: window.onDownloadProgress, responseType: 'blob' })
    .then(data => {
      if (data.type === 'image/jpeg') {
        showImgOnPage(data);
      } else {
        savedFile(data);
      }
    })
    .catch(error => {
      throw new Error(error);
    });
  btnDownload.disabled = true;
  inputDownload.value = '';
};

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
// function make btn upload enabled after click for choose same files in field
uploadLabel.addEventListener('click', function() {
  btnUpload.disabled = false;
});


showAndHiddenList(listBtn);
changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inputDownload, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);