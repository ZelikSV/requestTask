/* global  HttpRequest, onUploadProgress, onDownloadProgress, request */
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


function checkClickOnFileFromList(event) {
  const elem = event.target;

  if (elem.tagName === 'LI') {
    inputDownload.value = elem.innerHTML;
    btnDownload.disabled = false;
  }
}

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

function showAndHiddenList() {
  listWrapper.classList.toggle('active');
}

imgWrapper.querySelector('span').addEventListener('click', function() {
  imgWrapper.classList.remove('active');
});

document.querySelector('.upload-form').onsubmit = function(e) {
  e.preventDefault();
  const { files } = e.target.sampleFile;
  const data = new FormData();

  data.append('sampleFile', files[0]);
  request.post('/upload', { downloadLine: onUploadProgress, data }).then(() => myFileList.init());
  btnUpload.disabled = true;
};

document.querySelector('.download-form').onsubmit = function(e) {
  e.preventDefault();
  const { value } = e.target[0];
  request.get(`/files/${value}`, { downloadLine: onDownloadProgress, responseType: 'blob' })
    .then(data => {
      if (data.type === 'image/jpeg') {
        showImgOnPage(data, imgWrapper);
      } else {
        savedFile(data);
      }
    })
    .catch(error => error);
  btnDownload.disabled = true;
  inputDownload.value = '';
};

// function makes uploadBtn is enabled, after click after choose same files name in field
uploadLabel.addEventListener('click', function() {
  btnUpload.disabled = false;
});

listBtn.onclick = showAndHiddenList;
myFileList.clickListener(checkClickOnFileFromList);
changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inputDownload, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);