/* global  HttpRequest, utils, onUploadProgress, onDownloadProgress */
const inputUpload = document.querySelector('.upload-input');
const inputDownload = document.querySelector('.search-field');
const btnDownload = document.querySelector('.btn-download');
const uploadLabel = document.querySelector('.download-icon span');
const btnUpload = document.querySelector('.btn-upload');
const listBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
const listContainer = document.querySelector('.download-list');
const imgWrapper = document.querySelector('.download-img-wrap');
const { showImgOnPage, savedFile, changeStatusBtn, changeInputFileValue } = utils;
const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
const myFileList = new FileList(listContainer);

myFileList.clickListener(inputDownload, () => (btnDownload.disabled = false));

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
  xhr.post('/upload', { downloadLine: onUploadProgress, data }).then(() => myFileList.init());
  btnUpload.disabled = true;
};

document.querySelector('.download-form').onsubmit = function(e) {
  e.preventDefault();
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.get(`/files/${e.target[0].value}`, { downloadLine: onDownloadProgress, responseType: 'blob' })
    .then(data => {
      if (data.type === 'image/jpeg') {
        showImgOnPage(data, imgWrapper);
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

// function makes uploadBtn is enabled, after click after choose same files name in field
uploadLabel.addEventListener('click', function() {
  btnUpload.disabled = false;
});

listBtn.onclick = showAndHiddenList;
changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inputDownload, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);